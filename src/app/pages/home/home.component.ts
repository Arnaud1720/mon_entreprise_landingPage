import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { WhyWebsiteComponent } from '../../components/why-website/why-website.component';
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
    WhyWebsiteComponent,
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
      title: 'NonoDevCo | Création Sites WordPress pour Artisans à Bordeaux',
      description: 'Création de sites WordPress clés en main pour artisans et TPE en Gironde. Plombier, électricien, menuisier... Modifiez votre site vous-même sans coder. Devis gratuit sous 48h.',
      keywords: 'création site artisan bordeaux, site internet artisan gironde, développeur wordpress bordeaux, site web plombier, site web électricien, nonodevco, développeur saint-médard-en-jalles',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://nonodevco.com',
      image: 'https://nonodevco.com/assets/og-image.jpg'
    });

    this.seoService.createStructuredData();
  }
}
