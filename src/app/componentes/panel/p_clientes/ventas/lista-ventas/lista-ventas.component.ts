import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { VentasService } from 'src/app/servicios/ventas.service';
import * as html2pdf from 'html2pdf.js';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { HostListener } from '@angular/core'; 


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
public menuAbierto: number | null = null;  
public datos_restaurante: any = {};
public productosAgrupados: any[] | undefined;

constructor(private ventaService: VentasService, private router: Router,private firestore:Firestore) { 
  const usuario: any = localStorage.getItem('datos_usuario');
  this.datos_usuario = JSON.parse(usuario);
  this.alias=this.datos_usuario.alias;


  const restaurante:any = localStorage.getItem('datos_restaurante');
  this.datos_restaurante = JSON.parse(restaurante);
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
            this.ventas = data.map((venta: any) => {
                // Convertir el campo de fecha de cada venta a Date si es un Timestamp
                if (venta.fecha && venta.fecha.toDate) {
                    venta.fecha = venta.fecha.toDate(); // Convertir Timestamp a Date
                }
                return venta;
            });

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
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: `Venta-Lista-${index + 1}.pdf`, 
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'cm', format: [9, 18], orientation: 'portrait', compressPDF: true },
    };
    
  
     (html2pdf as any)().from(clonedContent).set(options).save();
    } else {
      console.error(`Elemento con ID "ListaVentas_PDF_${index}" no encontrado. No se pudo generar el PDF.`);
    }
  }


  generatePDF2(index: number, venta: any) {
    this.productosAgrupados = this.groupProductsById(venta.productos);
  
    const originalContent = document.getElementById(`DetalleVenta_PDF_${index}`);
    if (originalContent) {
      const clonedContent = originalContent.cloneNode(true) as HTMLElement;
      clonedContent.style.display = 'block';
  
      const options = {
        margin: [1, 2, 1, 2],
        filename: 'Reporte_Ventas.pdf',
        image: { type: 'jpeg', quality: 1 }, 
        html2canvas: { scale: 3 }, 
        jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait', compressPDF: true }, 
      };
  
      (html2pdf as any)().from(clonedContent).set(options).save();
    } else {
      console.error(`Elemento con ID "DetalleVenta_PDF_${index}" no encontrado. No se pudo generar el PDF.`);
    }
  }

  toggleMenu(index: number) {
    if (this.menuAbierto === index) {
      this.menuAbierto = null; 
    } else {
      this.menuAbierto = index; 
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const menuButton = document.getElementsByClassName('ml-4 text-gray-500 hover:text-gray-700');

    let clickedOnMenuButton = false;

    for (let i = 0; i < menuButton.length; i++) {
      if (menuButton[i].contains(target)) {
        clickedOnMenuButton = true;
        break; 
      }
    }

    if (!clickedOnMenuButton) {
      this.menuAbierto = null; 
    }
  }

  closeMenu() {
    this.menuAbierto = null; 
    console.log("Menu closed");
  }


  groupProductsById(products: any[]): any[] {
    const groupedProducts = products.reduce((acc, producto) => {
        const existingProduct = acc.find((item: { Id: any; }) => item.Id === producto.Id);
        
        if (existingProduct) {
            // Si el producto ya existe, suma la cantidad y el precio total
            existingProduct.cantidad += producto.cantidad;
            existingProduct.subtotal_producto += producto.cantidad * producto.precio;
        } else {
            // Si no existe, crea un nuevo objeto y calcula el subtotal inicial
            acc.push({
                ...producto,
                subtotal_producto: producto.cantidad * producto.precio // Inicializar subtotal
            });
        }
        return acc;
    }, []);
    return groupedProducts;
}

}
