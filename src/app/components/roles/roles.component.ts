import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  imports: [FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  firstName: string = 'Sachin Pasindu';
  lastName = 'Pitigala';
  age: number = 18;
  isActive:boolean = false;
  currentDate : Date = new Date();
  inputType:string = "checkbox";

  showAlert(){
    alert("Alert works");
  }

  showMessage(message:string){
    alert(message);
  }
}
