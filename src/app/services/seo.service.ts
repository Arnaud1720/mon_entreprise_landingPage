import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    type?: string;
    url?: string;
    image?: string;
  }) {
    // Title
    if (config.title) {
      this.title.setTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    // Description
    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    // Keywords
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Author
    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    }

    // Open Graph
    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.meta.updateTag({ name: 'twitter:url', content: config.url });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  createStructuredData() {
    if (isPlatformBrowser(this.platformId)) {
      // LocalBusiness Schema
      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'NonoDevCo - Arnaud Derisbourg - Développeur Web Freelance',
        'description': 'Développeur web freelance à Bordeaux spécialisé en WordPress, Java, Spring Boot et Angular. Création de sites vitrines et applications web sur mesure pour TPE/PME en Gironde.',
        'url': 'https://nonodevco.com',
        'telephone': '+33626921345',
        'email': 'contact.nonodevco@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '2 rue Charles Chaplin',
          'addressLocality': 'Saint-Médard-en-Jalles',
          'postalCode': '33160',
          'addressRegion': 'Gironde',
          'addressCountry': 'FR'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '44.8985',
          'longitude': '-0.7189'
        },
        'priceRange': '€€',
        'areaServed': ['Bordeaux', 'Saint-Médard-en-Jalles', 'Gironde', 'Nouvelle-Aquitaine', 'France'],
        'serviceType': ['Développement WordPress', 'Développement Java', 'Développement Angular', 'Création site vitrine', 'Application web sur mesure', 'SaaS']
      };

      // Person Schema
      const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Arnaud Derisbourg',
        'jobTitle': 'Développeur Web Freelance',
        'description': 'Développeur web freelance à Bordeaux expert en WordPress, Java, Spring Boot et Angular. Basé à Saint-Médard-en-Jalles en Gironde.',
        'email': 'contact.nonodevco@gmail.com',
        'telephone': '+33626921345',
        'url': 'https://nonodevco.com',
        'sameAs': [
          'https://www.malt.fr/profile/arnaudderisbourg',
          'https://www.linkedin.com/in/arnaud-derisbourg-25765a169/',
          'https://www.fiverr.com/s/VY9r39e'
        ],
        'workLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Saint-Médard-en-Jalles',
            'addressRegion': 'Gironde',
            'addressCountry': 'FR'
          }
        },
        'knowsAbout': [
          'Développement WordPress',
          'Java',
          'Spring Boot',
          'Angular',
          'Développement Web',
          'Application Web',
          'Site Vitrine',
          'SaaS',
          'API REST'
        ]
      };

      // Service Schema
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Développement Web',
        'provider': {
          '@type': 'Person',
          'name': 'Arnaud Derisbourg'
        },
        'areaServed': 'France',
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Services de développement web',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Site WordPress Administrable',
                'description': 'Création de site vitrine WordPress avec blocs personnalisés ACF Pro'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Application Java Angular',
                'description': 'Développement d\'application web avec backend Java Spring Boot et frontend Angular'
              }
            }
          ]
        }
      };

      this.insertSchema(localBusinessSchema, 'local-business-schema');
      this.insertSchema(personSchema, 'person-schema');
      this.insertSchema(serviceSchema, 'service-schema');
    }
  }

  private insertSchema(schema: any, id: string) {
    if (isPlatformBrowser(this.platformId)) {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (script) {
        script.textContent = JSON.stringify(schema);
      } else {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    }
  }

  generateSitemap() {
    // Cette méthode sera utilisée pour générer un sitemap.xml
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nonodevco.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/#services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/#about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/#testimonials</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/#contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/saas</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/mon-approche</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/cgv</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://nonodevco.com/mentions-legales</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
  }
}
