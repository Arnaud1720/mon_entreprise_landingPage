import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-saas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.css']
})
export class SaasComponent implements OnInit {
  isMonthly = false; // false = comptant, true = mensuel

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  togglePricing() {
    this.isMonthly = !this.isMonthly;
  }

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Développement SaaS Sur Mesure Bordeaux | NonoDevCo - Développeur Freelance',
      description: 'Création de SaaS personnalisés à Bordeaux : marketplaces, outils métiers, applications de réservation. Stack Java/Angular/Spring Boot ou WordPress. Développeur freelance en Gironde.',
      keywords: 'développement saas bordeaux, créer saas gironde, saas sur mesure, marketplace, application métier, java spring boot, angular, développeur saas freelance bordeaux, saint-médard-en-jalles',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://nonodevco.com/saas',
      image: 'https://nonodevco.com/assets/og-image.jpg'
    });
  }

  scrollToContact(ctaSource: string = 'saas_page') {
    // Tracking GA4
    this.analytics.trackSaasCtaClick(ctaSource);

    // Navigate to home and scroll to contact
    window.location.href = '/#contact';
  }

  // Tracking pour les CTAs (sans bloquer la navigation)
  trackCtaClick(ctaType: string): void {
    this.analytics.trackSaasCtaClick(ctaType);
  }
}
