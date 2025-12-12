import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
  source: 'google' | 'trustpilot' | 'malt' | 'linkedin';
  date: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit {
  testimonialsVisible = false;

  // Avis exemples (à remplacer par de vrais avis plus tard)
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sophie Martin',
      role: 'Directrice',
      company: 'Boutique en ligne',
      rating: 5,
      comment: 'Excellent travail ! Le site WordPress est exactement ce que je voulais. Facile à gérer et très professionnel. Je recommande vivement !',
      source: 'google',
      date: 'Il y a 2 mois'
    },
    {
      id: 2,
      name: 'Jean Dupont',
      role: 'CEO',
      company: 'StartUp Tech',
      rating: 5,
      comment: 'Application Angular parfaitement développée. Code propre, bien documenté et livré dans les délais. Un vrai professionnel !',
      source: 'malt',
      date: 'Il y a 1 mois'
    },
    {
      id: 3,
      name: 'Marie Lambert',
      role: 'Responsable Marketing',
      company: 'Agence Créative',
      rating: 5,
      comment: 'Très satisfaite du site vitrine. Design moderne, responsive et SEO optimisé. La formation pour gérer le contenu était très claire.',
      source: 'google',
      date: 'Il y a 3 semaines'
    }
  ];

  currentIndex = 0;
  autoplayInterval: any;

  ngOnInit() {
    this.checkVisibility();
    this.startAutoplay();
  }

  ngOnDestroy() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkVisibility();
  }

  private checkVisibility() {
    const element = document.getElementById('testimonials');
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      this.testimonialsVisible = rect.top < windowHeight * 0.75;
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000); // Change tous les 5 secondes
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  previousTestimonial() {
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }

  goToTestimonial(index: number) {
    this.currentIndex = index;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getSourceIcon(source: string): string {
    const icons: { [key: string]: string } = {
      google: '🔍',
      trustpilot: '⭐',
      malt: '💼',
      linkedin: '🔗'
    };
    return icons[source] || '⭐';
  }

  getSourceName(source: string): string {
    const names: { [key: string]: string } = {
      google: 'Google',
      trustpilot: 'Trustpilot',
      malt: 'Malt',
      linkedin: 'LinkedIn'
    };
    return names[source] || source;
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
