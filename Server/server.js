// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Q0CsUKM9by4ZMgcXuJMAv9NyNximj9h0A7VZOgKNZFqIkFN0gF9i4HtELIvfi6u9dcArqC5c07Td7aMaYoKLpKs00MIFLyYYl');
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const app = express();


app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/pagar_suscripcion', async (req, res) => {
  const suscripcion = req.body.items.map((item)=>{
    return{
      price_data:{
        currency:'mxn',
        product_data:{
          name: item.nombre,
          images:[item.image]
        },
        unit_amount:item.price * 100,
      },
      queatity:item.cantidad
    }
  });


  const session = await stripe.checkout.sessions.create({
    line_items:[...items],
    mode:'payment',
    success_url:`${YOUR_DOMAIN}/success.html`,
    cancel_url:`${YOUR_DOMAIN}/cancel.html`,

  });

  res.status(200).json(session);

});

app.listen(4242, () => console.log('Running on port 4242'));