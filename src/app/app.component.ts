import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mon Entreprise Landing';

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Bloquer Ctrl+U (code source), Ctrl+S (sauvegarder), Ctrl+Shift+I (DevTools)
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.key === 's' || event.key === 'S')) {
      event.preventDefault();
    }
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i')) {
      event.preventDefault();
    }
    // Bloquer F12 (DevTools)
    if (event.key === 'F12') {
      event.preventDefault();
    }
  }

  @HostListener('document:dragstart', ['$event'])
  onDragStart(event: Event): void {
    event.preventDefault();
  }
}
