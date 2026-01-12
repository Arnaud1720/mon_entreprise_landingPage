import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';
import { ProcessComponent } from '../../components/process/process.component';
import { AboutComponent } from '../../components/about/about.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { BookingComponent } from '../../components/booking/booking.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    PortfolioComponent,
    ProcessComponent,
    AboutComponent,
    TestimonialsComponent,
    BookingComponent,
    FaqComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Développeur Web Freelance WordPress & Java Angular | Arnaud Derisbourg',
      description: 'Développeur web freelance expert WordPress, Java, Spring Boot et Angular 17+. Création de sites vitrines administrables et applications web sur mesure pour TPE/PME en France. Devis gratuit.',
      keywords: 'développeur web freelance, développeur wordpress, développeur java, développeur angular, spring boot, site vitrine, application web, développement web sur mesure, freelance informatique, création site internet, TPE PME, développeur full stack, react, typescript, paris, france',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://votresite.com',
      image: 'https://votresite.com/assets/og-image.jpg'
    });

    this.seoService.createStructuredData();
  }
}
