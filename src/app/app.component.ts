import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ProcessComponent } from './components/process/process.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    ProcessComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mon Entreprise Landing';

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    // Configuration SEO optimisée avec mots-clés TFIDF
    this.seoService.updateMetaTags({
      title: 'Développeur Web Freelance WordPress & Java Angular | Arnaud Derisbourg',
      description: 'Développeur web freelance expert WordPress, Java, Spring Boot et Angular 17+. Création de sites vitrines administrables et applications web sur mesure pour TPE/PME en France. Devis gratuit.',
      keywords: 'développeur web freelance, développeur wordpress, développeur java, développeur angular, spring boot, site vitrine, application web, développement web sur mesure, freelance informatique, création site internet, TPE PME, développeur full stack, react, typescript, paris, france',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://votresite.com',
      image: 'https://votresite.com/assets/og-image.jpg'
    });

    // Ajouter les données structurées Schema.org
    this.seoService.createStructuredData();
  }
}
