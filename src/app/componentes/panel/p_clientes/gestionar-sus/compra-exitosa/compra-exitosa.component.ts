import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-exitosa',
  templateUrl: './compra-exitosa.component.html',
  styleUrls: ['./compra-exitosa.component.scss']
})
export class CompraExitosaComponent {
constructor(
  private router:Router
){

}


menu(){
  this.router.navigate(['/panel/inicio_panel']);
}
}
