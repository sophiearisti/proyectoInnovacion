import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';


// Define la interfaz DropdownItem
interface DropdownItem {
  item_id: number;
  item_text: string;
}

@Component({
  selector: 'app-info-cuenta',
  standalone: true,
  imports: [UpBarComponent, NavigationBarComponent,CommonModule,FormsModule,NgMultiSelectDropDownModule],
  templateUrl: './info-cuenta.component.html',
  styleUrl: './info-cuenta.component.css'
})
export class InfoCuentaComponent {
  // Usa la interfaz DropdownItem para las listas y los elementos seleccionados
  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings: IDropdownSettings = {};
  isEditing: boolean = false; // Estado de edición
  nombreEmpresa: string = ''; // Ejemplo de campo para nombre
  descripcionEmpresa: string = ''; // Ejemplo de campo para descripción

  ngOnInit() {
    // Inicializa la lista desplegable con DropdownItem
    this.dropdownList = [
      { item_id: 1, item_text: 'Moda' },
      { item_id: 2, item_text: 'Accesorios' },
      { item_id: 3, item_text: 'Ropa' },
      { item_id: 4, item_text: 'Mujer' },
      { item_id: 5, item_text: 'Hombre' }
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
  }

  toggleEdit() {
    if (this.isEditing) {
      // Aquí puedes añadir la lógica para guardar los datos si es necesario
      console.log('Datos guardados:', this.nombreEmpresa, this.descripcionEmpresa, this.selectedItems);
    }
    
    this.isEditing = !this.isEditing;
  }

  // Maneja la selección de un ítem
  onItemSelect(item: DropdownItem) {
    console.log(item);
  }

  // Maneja la selección de todos los ítems
  onSelectAll(items: DropdownItem[]) {
    console.log(items);
  }

  defaultImageSrc: string = '/images/foto.jpg'; // Reemplaza con la ruta de tu imagen predeterminada
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
