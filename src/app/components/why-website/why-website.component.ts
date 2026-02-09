import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-website',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-website.component.html',
  styleUrl: './why-website.component.css'
})
export class WhyWebsiteComponent {
  statistics = [
    {
      number: '90%',
      label: 'des clients cherchent un artisan sur Google avant de l\'appeler'
    },
    {
      number: '47%',
      label: 'des artisans n\'ont pas encore de site web'
    },
    {
      number: '24/7',
      label: 'votre site travaille pour vous, même la nuit'
    }
  ];

  benefits = [
    {
      icon: 'search',
      title: 'Soyez trouvé sur Google',
      description: 'Quand un client cherche "plombier Bordeaux" ou "électricien Saint-Médard", il doit vous trouver. Sans site, vous êtes invisible.'
    },
    {
      icon: 'trust',
      title: 'Inspirez confiance',
      description: 'Un site professionnel rassure vos prospects. Ils voient vos réalisations, vos avis clients, et savent à qui ils ont affaire.'
    },
    {
      icon: 'time',
      title: 'Gagnez du temps',
      description: 'Vos clients trouvent vos horaires, tarifs et zone d\'intervention sans vous appeler. Moins d\'appels inutiles, plus de chantiers.'
    },
    {
      icon: 'competition',
      title: 'Démarquez-vous',
      description: 'Vos concurrents ont un site ? Vous devez en avoir un aussi. Ils n\'en ont pas ? C\'est l\'occasion de prendre de l\'avance.'
    }
  ];

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
