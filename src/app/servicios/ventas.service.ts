import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app'; // Importar Firebase
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  constructor(
    private firestore: AngularFirestore,
    private fas: AngularFireAuth,
    private storage: AngularFireStorage
  ) {}
  obtenerVentasPorRangoDeFechas(alias: string, fechaInicio: any, fechaFin: any) {
    return this.firestore.collection('venta', ref => 
        ref.where('alias', '==', alias)
           .where('fecha', '>=', fechaInicio)
           .where('fecha', '<', fechaFin)
    ).valueChanges();
}


obtenerVentasporfolio(alias: string,folio: string) {
    return this.firestore.collection('venta', ref => 
        ref.where('alias', '==', alias)
           .where('folio', '==', folio)
    ).valueChanges();
}
}
