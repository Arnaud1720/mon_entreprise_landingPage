import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-saas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.css']
})
export class SaasComponent implements OnInit {
  isMonthly = false; // false = comptant, true = mensuel

  constructor(private seoService: SeoService) {}

  togglePricing() {
    this.isMonthly = !this.isMonthly;
  }

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Développement SaaS Sur Mesure | Arnaud Derisbourg - Développeur Freelance',
      description: 'Création de SaaS personnalisés : marketplaces, outils métiers, applications de réservation. Stack WordPress ou Java/Angular/Spring Boot. Devis gratuit.',
      keywords: 'développement saas, créer saas, saas sur mesure, marketplace, application métier, java spring boot, angular, wordpress custom, développeur saas freelance',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://nonodevco.com/saas',
      image: 'https://nonodevco.com/assets/og-image.jpg'
    });
  }

  scrollToContact() {
    // Navigate to home and scroll to contact
    window.location.href = '/#contact';
  }
}
