import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NuevoProductoDescripcionComponent } from "../components/nuevo-producto-descripcion/nuevo-producto-descripcion.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';
import { EditarProductoDescripcionComponent } from "../components/editar-producto-descripcion/editar-producto-descripcion.component";
import { ProductoService } from '../shared/producto.service';

// Define la interfaz DropdownItem
interface DropdownItem {
  item_id: number;
  item_text: string;
}
@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    NuevoProductoDescripcionComponent,
    NavigationBarComponent,
    UpBarComponent,
    NgMultiSelectDropDownModule, EditarProductoDescripcionComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  constructor(private productoService: ProductoService) {}
  
  productos_tabla = [
    { nombre: 'zapatos ', cantidad: 10, color: 'azul', talla: 'M', imagen: '/images/zapatos2.jpg', ID: '123' },
    { nombre: 'zapatos cool', cantidad: 5, color: 'verde', talla: 'L', imagen: '/images/zapatos3.jpg', ID: '1234' },
    { nombre: 'zapatos wow', cantidad: 8, color: 'rojo', talla: 'S', imagen: '/images/zapatos4.jpg', ID: '12345' },
    { nombre: 'zap', cantidad: 2, color: 'negro', talla: 'XL', imagen: '/images/zapatos5.jpg', ID: '1235'}
  ];
  
  productos: any[] = [];
  nombre=""
  descripcion=""
  promocion=0
  codigo=""
  precio=0

  // Usa la interfaz DropdownItem para las listas y los elementos seleccionados
  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings: IDropdownSettings = {};

  ngOnInit() {
    // Inicializa la lista desplegable con DropdownItem
    this.dropdownList = [
      { item_id: 1, item_text: 'Moda' },
      { item_id: 2, item_text: 'Accesorios' },
      { item_id: 3, item_text: 'Ropa' },
      { item_id: 4, item_text: 'Mujer' },
      { item_id: 5, item_text: 'Hombre' }
    ];

    this.selectedItems = [
      { item_id: 3, item_text: 'Ropa' },
      { item_id: 1, item_text: 'Moda' }
    ];

    // Configura los ajustes del dropdown
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    //obtener el id producto del local storage
    const idProducto = localStorage.getItem('idProducto');

    //obtener los datos del producto desde el service del producto
    if (idProducto) {
      this.productoService.obtenerProducto(idProducto).then(async (producto) => {
        //asignar cada campo donde debe ir
        if (producto) {
          this.nombre = producto.nombre;
          this.descripcion = producto.descripcion;
          this.promocion = producto.promocion;
          this.codigo = producto.codigo;
          this.precio = producto.precio;

          //tal y como en editar cuenta aca se llenan los tags
          this.selectedItems = this.dropdownList.filter(item => producto.tags.includes(item.item_text));
          const imageUrl = await this.productoService.obtenerImagen("productos/" + idProducto);
          if (imageUrl) {
            this.imageSrc = imageUrl; // Asigna la URL obtenida al atributo imageSrc
          }
          //obtener las variantes del producto
          this.productos = producto.variantes.map(variante => ({
            nombre: variante.nombre,
            color: variante.color,
            talla: variante.talla,
            cant: variante.cant,
            imageSrc: variante.imagen,
            codigo: variante.codigo,
          }));
        } else {
          console.error('Producto is undefined');
        }
        
      });
    } else {
      console.error('idProducto is null');
    }

  }

  // Maneja la selección de un ítem
  onItemSelect(item: DropdownItem) {
    console.log(item);
  }

  // Maneja la selección de todos los ítems
  onSelectAll(items: DropdownItem[]) {
    console.log(items);
  }

  // Añade un producto a la lista
  anadirProducto() {
    this.productos.push({});
  }

  // Elimina un producto de la lista
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  defaultImageSrc: string = '/images/zapatos1.jpg'; // Reemplaza con la ruta de tu imagen predeterminada
  imageSrc: string | ArrayBuffer | null = this.defaultImageSrc;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Asegúrate de que e.target?.result no sea undefined
        if (e.target?.result) {
          this.imageSrc = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
