import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  constructor(public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    public dataService: UsuarioService) { }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
      ]);
      
      getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
      '';
      }
      
      submit() {
      // empty stuff
      }
      
      onNoClick(): void {
      this.dialogRef.close();
      }
      
      public confirmAdd(): void {
      this.dataService.updateItem(this.data);
      }
}
