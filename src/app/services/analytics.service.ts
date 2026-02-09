import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export type EventCategory =
  | 'engagement'
  | 'conversion'
  | 'navigation'
  | 'form'
  | 'external_link';

export interface AnalyticsEvent {
  action: string;
  category: EventCategory;
  label?: string;
  value?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Envoie un evenement personnalise a GA4
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isBrowser || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });
  }

  // =============================================
  // EVENEMENTS DE CONVERSION (CTA principaux)
  // =============================================

  /**
   * Clic sur bouton "Demander un devis"
   */
  trackDevisClick(source: string): void {
    this.trackEvent({
      action: 'clic_demander_devis',
      category: 'conversion',
      label: source
    });
  }

  /**
   * Clic sur bouton "Contact"
   */
  trackContactClick(source: string): void {
    this.trackEvent({
      action: 'clic_contact',
      category: 'conversion',
      label: source
    });
  }

  /**
   * Soumission du formulaire de contact
   */
  trackFormSubmit(formType: string): void {
    this.trackEvent({
      action: 'formulaire_soumis',
      category: 'conversion',
      label: formType
    });
  }

  /**
   * Clic sur CTA SaaS
   */
  trackSaasCtaClick(ctaType: string): void {
    this.trackEvent({
      action: 'clic_cta_saas',
      category: 'conversion',
      label: ctaType
    });
  }

  // =============================================
  // EVENEMENTS D'ENGAGEMENT
  // =============================================

  /**
   * Clic sur un service
   */
  trackServiceClick(serviceName: string): void {
    this.trackEvent({
      action: 'clic_service',
      category: 'engagement',
      label: serviceName
    });
  }

  /**
   * Clic sur un temoignage (carousel)
   */
  trackTestimonialView(testimonialId: number): void {
    this.trackEvent({
      action: 'vue_temoignage',
      category: 'engagement',
      label: `temoignage_${testimonialId}`
    });
  }

  /**
   * Scroll vers une section
   */
  trackSectionScroll(sectionName: string): void {
    this.trackEvent({
      action: 'scroll_section',
      category: 'navigation',
      label: sectionName
    });
  }

  // =============================================
  // LIENS EXTERNES
  // =============================================

  /**
   * Clic sur lien externe (Malt, LinkedIn, Fiverr)
   */
  trackExternalLink(platform: string, url: string): void {
    this.trackEvent({
      action: 'clic_lien_externe',
      category: 'external_link',
      label: platform
    });
  }

  /**
   * Clic sur email
   */
  trackEmailClick(): void {
    this.trackEvent({
      action: 'clic_email',
      category: 'conversion',
      label: 'contact_email'
    });
  }

  /**
   * Clic sur telephone
   */
  trackPhoneClick(): void {
    this.trackEvent({
      action: 'clic_telephone',
      category: 'conversion',
      label: 'contact_phone'
    });
  }

  // =============================================
  // NAVIGATION
  // =============================================

  /**
   * Navigation vers une page
   */
  trackPageView(pageName: string): void {
    this.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: pageName
    });
  }

  /**
   * Clic menu navigation
   */
  trackNavClick(menuItem: string): void {
    this.trackEvent({
      action: 'clic_menu',
      category: 'navigation',
      label: menuItem
    });
  }
}
