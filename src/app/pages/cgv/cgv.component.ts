import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-cgv',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cgv.component.html',
  styleUrls: ['./cgv.component.css']
})
export class CgvComponent implements OnInit {

  // Informations de l'entreprise
  entreprise = {
    nom: 'Arnaud Derisbourg',
    statut: 'Entrepreneur individuel',
    siret: '999 283 393 00018',
    adresse: '2 rue Charles Chaplin',
    codePostal: '33160',
    ville: 'Saint-Medard-en-Jalles',
    email: '', // A completer quand l'email sera cree
    telephone: '06 26 92 13 45'
  };

  // Date de derniere mise a jour des CGV
  dateMiseAJour = '12 janvier 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Conditions Generales de Vente | Arnaud Derisbourg - Developpeur Freelance',
      description: 'Conditions Generales de Vente des prestations de developpement web et SaaS proposees par Arnaud Derisbourg, developpeur freelance.',
      keywords: 'cgv, conditions generales de vente, mentions legales, developpeur freelance',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://votresite.com/cgv',
      image: 'https://votresite.com/assets/og-image.jpg'
    });

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }
}
