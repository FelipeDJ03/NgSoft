import { HttpClient } from "@angular/common/http";  
import { inject, Injectable } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { map } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn:'root'})
export class suscripcionService{
    private readonly _http=inject(HttpClient);
    private readonly _url = environment.Server_stripe;

    // onProceedToPay(productos:any) {
    //     return this._http.post(`${this._url}/pagar_suscripcion`,{items:productos})
    //     .pipe(
    //         map(async(res:any)=>{
    //             const stripe = await loadStripe(environment.stripeAPIKEY);
    //             stripe?.redirectToCheckout({sessionId:res.id});
    //         })
    //     ).subscribe({
    //         error:(err)=> console.error('Error',err)
    //     });

    // }
    onProceedToPay(producto: any) {
        // Asegurarnos de que producto tiene los campos necesarios antes de enviarlo
        const payload = {
          id:producto.id,
          nombre: producto.nombre,
          image: producto.image,
          precio: producto.precio,
          cantidad: producto.cantidad,
          admin_nombre:producto.admin_nombre,
          restaurante:producto.restaurante,
          periodo:producto.periodo,
        };
    
        console.log('Payload que se envía al servidor:', payload); // Para verificar lo que se envía
    
        return this._http.post(`${this._url}/pagar_suscripcion`, payload)
        .pipe(
          map(async (res: any) => {
            const stripe = await loadStripe(environment.stripeAPIKEY);
            stripe?.redirectToCheckout({ sessionId: res.id });
          })
        ).subscribe({
          error: (err) => console.error('Error', err)
        });
      }
}