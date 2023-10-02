import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
selectedFiles: any[];
  
constructor(public dialogRef: MatDialogRef<AgregarComponent>,
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
  this.dataService.addItem(this.data);
  }





}
