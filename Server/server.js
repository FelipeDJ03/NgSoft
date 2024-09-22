const stripe = require('stripe')('sk_test_51Q0CsUKM9by4ZMgcXuJMAv9NyNximj9h0A7VZOgKNZFqIkFN0gF9i4HtELIvfi6u9dcArqC5c07Td7aMaYoKLpKs00MIFLyYYl');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const admin = require('firebase-admin');
var serviceAccount = require("./firebase/project-1062449646823519922-firebase-adminsdk-bk1id-de505e2ea6.json");

app.use(express.static('public'));
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-1062449646823519922-default-rtdb.firebaseio.com"});
// No uses bodyParser.json() globalmente antes del webhook. Lo aplicamos después del webhook.

// Endpoint para el webhook de Stripe (bodyParser.raw solo para este endpoint)
app.post('/suscripcion_completada', bodyParser.raw({ type: 'application/json' }), (req, res) => { 
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_W7CGciXmBWkR301hBG9qM4cq5lNOsK6i';

  let event;

  try {
    // Verifica el payload usando el cuerpo sin procesar y la firma de Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️ Error en la validación del webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }


  // Procesar los eventos de Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata;  // Acceder al metadata
    console.log(metadata);
    // Extraer los campos del metadata
    const restauranteId = metadata.restaurante;
    const nombreProducto = metadata.nombre;
    const periodo = metadata.periodo; // 'mensual' o 'anual'

    // Obtener la fecha actual
    const susInicio = new Date();
    let susFinal = new Date(susInicio);  // Copiar la fecha actual

    // Actualizar la fecha de sus_final en función del periodo
    if (periodo === 'mensual') {
      susFinal.setMonth(susFinal.getMonth() + 1);  // Sumar un mes
    } else if (periodo === 'anual') {
      susFinal.setFullYear(susFinal.getFullYear() + 1);  // Sumar un año
    }

    // Corregir posibles errores de fecha (por ejemplo, si suma un mes a una fecha que no existe)
    if (susFinal.getDate() !== susInicio.getDate()) {
      susFinal.setDate(0);  // Ajustar al último día del mes anterior si el día no existe en el mes
    }

    // Aquí actualizamos Firebase
    const db = admin.firestore();

    // Insertar en la colección de pagos_suscripcion
    db.collection('pagos_suscripcion').add({
      emailCliente: session.customer_details.email,
      cantidadPagada: session.amount_total / 100, // Convertir a pesos
      idSesion: session.id,
      admin_nombre: metadata.admin_nombre,
      restaurante: restauranteId,
      nombreProducto: nombreProducto,
      periodo: periodo,
      id_producto: metadata.id
    })
    .then(() => {
      console.log('Compra registrada en Firebase');
      
      // Actualizar el registro en la colección restaurantes
      db.collection('restaurantes').doc(restauranteId).update({
        sus_inicio: susInicio,  // Fecha de inicio
        sus_final: susFinal,    // Fecha de fin corregida
        plan: nombreProducto,   // Actualizar el plan
        estado: 'activo'        // Actualizar el estado a "activo"
      })
      .then(() => {
        console.log('Restaurante actualizado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el restaurante:', error);
      });
    })
    .catch((error) => {
      console.error('Error al registrar la compra en Firebase:', error);
    });
  }

  // Responde a Stripe para confirmar que el webhook fue procesado correctamente
  res.json({ received: true });
});




// Usar bodyParser.json() para el resto de las rutas
app.use(bodyParser.json());

// Endpoint para pagar suscripción única
app.post('/pagar_suscripcion', async (req, res) => {
  try {
    const items = [
      {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: req.body.nombre,
            images: [req.body.image],
          },
          unit_amount: req.body.precio * 100, // precio en centavos
        },
        quantity: 1,
      },
    ];

   
    // Crear la sesión de Stripe con metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `http://localhost:4200/panel/cliente/gestionar_suscripcion/exitoso`,
      cancel_url: `http://localhost:4200/panel/cliente/gestionar_suscripcion/cancelado`,
      metadata: {
        admin_nombre: req.body.admin_nombre,
        restaurante: req.body.restaurante,
        id:req.body.id,
        nombre:req.body.nombre,
        periodo:req.body.periodo,
      },
    });

    res.status(200).json(session); // Asegúrate de que estás devolviendo la sesión
  } catch (error) {
    console.error('Error en la creación de sesión de Stripe:', error);
    res.status(500).send('Error en la creación de sesión de Stripe');
  }
});


// Endpoint para pagar lista de productos
app.post('/pagar_productos', async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.nombre,
          images: [item.image],
        },
        unit_amount: item.precio * 100,
      },
      quantity: item.cantidad,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.status(200).json(session);
});

// Iniciar servidor en el puerto 4242
app.listen(4242, () => console.log('Servidor corriendo en puerto 4242'));
