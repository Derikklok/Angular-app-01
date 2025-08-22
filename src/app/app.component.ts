import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';

@Component({
  selector: 'app-root',
  imports: [RolesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-app';
}
