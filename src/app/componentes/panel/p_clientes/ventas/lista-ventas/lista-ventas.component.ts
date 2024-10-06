import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { VentasService } from 'src/app/servicios/ventas.service';
import * as html2pdf from 'html2pdf.js';
import { Firestore, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.scss']
})
export class ListaVentasComponent {
public load_data=true;
ventas: Array<any> =[];
private destroy$ = new Subject<void>();
fechaSeleccionada: string | undefined = this.getDefaultDate();
totalVentas: number = 0;
totalVendido: number = 0;
public filtro_ventas = "";
public mostrar=true;
public alias;
public datos_usuario: any = {};

constructor(private ventaService: VentasService, private router: Router,private firestore:Firestore) { 
  const usuario: any = localStorage.getItem('datos_usuario');
  this.datos_usuario = JSON.parse(usuario);
  this.alias=this.datos_usuario.alias;
}
  

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initData() {
    if (this.fechaSeleccionada) {
        console.log(this.fechaSeleccionada); // Por ejemplo: '06/10/2024'

        // Convertir la fecha seleccionada a un objeto Date
        const fechaDate = this.convertStringToDate(this.fechaSeleccionada);
        console.log('Fecha como objeto Date:', fechaDate);

        // Convertir el objeto Date a Timestamp
        const fechaTimestamp = this.convertDateToTimestamp(fechaDate);
        console.log('Timestamp:', fechaTimestamp);

        // Aquí puedes realizar la consulta en Firestore
        // Supongamos que tienes fechas de inicio y fin que también deseas manejar
        const fechaFinalDate = new Date(fechaDate);
        fechaFinalDate.setDate(fechaFinalDate.getDate() + 1); // Añadir un día para incluir toda la fecha

        const fechaFinalTimestamp = this.convertDateToTimestamp(fechaFinalDate);

        this.ventaService.obtenerVentasPorRangoDeFechas(this.alias, fechaTimestamp, fechaFinalTimestamp)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                data => {
                     // Procesar datos
                    this.calculateTotals();
                    this.load_data = false;
                    this.mostrar = true;
                    this.ventas=data.map((ventas: any) => {
        
                      ventas.fecha = ventas.fecha.toDate(); // Convertir a Date
                 
                    return ventas;
                  });

                    console.log('Ventas:', this.ventas);
                },
                error => {
                    console.error('Error al obtener datos de ventas', error);
                }
            );
    }
}

filtro() {
  const token = localStorage.getItem('token');
  this.load_data = true;
  console.log(this.filtro_ventas);

  setTimeout(() => {
   
    this.ventaService.obtenerVentasporfolio(this.alias, this.filtro_ventas)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
        data => {
            this.ventas = data; // Procesar datos
            this.calculateTotals();
            this.load_data = false;
            this.mostrar = true;
            console.log('Ventas:', this.ventas);
        },
        error => {
            console.error('Error al obtener datos de ventas', error);
        }
    );
  }, 500);

}

convertStringToDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Recuerda que los meses en JS son 0-indexados
}

convertDateToTimestamp(date: Date) {
  return Timestamp.fromDate(date);
}

  calculateTotals() {
    this.totalVentas = 0;
    this.totalVendido = 0;

    this.ventas.forEach(venta => {
      this.totalVentas += 1; 
      this.totalVendido += venta.total; 
    });
  }

  buscarVentas() {
    this.load_data = true;
    this.initData();
  }

  getDefaultDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


 

  generatePDF(index: number) {
    const originalContent = document.getElementById(`ListaVentas_PDF_${index}`);
    
    if (originalContent) {
      const clonedContent = originalContent.cloneNode(true) as HTMLElement;
      clonedContent.style.display = 'block';
  
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Venta-Lista-${index + 1}.pdf`, 
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'cm', format: [9, 5], orientation: 'portrait', compressPDF: true },
    };
    
  
     (html2pdf as any)().from(clonedContent).set(options).save();
    } else {
      console.error(`Elemento con ID "ListaVentas_PDF_${index}" no encontrado. No se pudo generar el PDF.`);
    }
  }

}
