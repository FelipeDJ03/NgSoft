import { HttpClient } from "@angular/common/http";  
import { inject, Injectable } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { map } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn:'root'})
export class suscripcionService{
    private readonly _http=inject(HttpClient);
    private readonly _url = environment.Server_stripe;

    onProceedToPay(productos:any) {
        return this._http.post(`${this._url}/checkout`,{items:productos})
        .pipe(
            map(async(res:any)=>{
                const stripe = await loadStripe(environment.stripeAPIKEY);
                stripe?.redirectToCheckout({sessionId:res.id});
            })
        ).subscribe({
            error:(err)=> console.error('Error',err)
        });

    }
}