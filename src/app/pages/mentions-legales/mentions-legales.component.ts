import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentions-legales.component.html',
  styleUrls: ['./mentions-legales.component.css']
})
export class MentionsLegalesComponent implements OnInit {

  // Informations de l'entreprise
  entreprise = {
    nom: 'Arnaud Derisbourg',
    statut: 'Entrepreneur individuel',
    siret: '999 283 393 00018',
    adresse: '2 rue Charles Chaplin',
    codePostal: '33160',
    ville: 'Saint-Medard-en-Jalles',
    email: 'contact.nonodevco@gmail.com',
    telephone: '06 26 92 13 45'
  };

  // Informations de l'hebergeur
  hebergeur = {
    nom: 'Vercel Inc.',
    adresse: '340 S Lemon Ave #4133',
    ville: 'Walnut, CA 91789',
    pays: 'Etats-Unis',
    site: 'https://vercel.com'
  };

  // Date de derniere mise a jour
  dateMiseAJour = '13 janvier 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Mentions Legales | Arnaud Derisbourg - Developpeur Freelance',
      description: 'Mentions legales du site nonodevco.com - Informations sur l\'editeur, l\'hebergeur et la protection des donnees personnelles.',
      keywords: 'mentions legales, informations legales, editeur, hebergeur, RGPD, developpeur freelance',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://nonodevco.com/mentions-legales',
      image: 'https://nonodevco.com/assets/og-image.jpg'
    });

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }
}
