import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// Critères de notation détaillés
interface RatingCriteria {
  delais: number;        // Respect des délais (1-5)
  qualite: number;       // Qualité du développement (1-5)
  communication: number; // Communication (1-5)
  rapport: number;       // Rapport qualité/prix (1-5)
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;   // Lien vers le site du client
  ratings: RatingCriteria;
  averageRating: number; // Moyenne calculée
  comment: string;
  image?: string;
  source: 'google' | 'trustpilot' | 'malt' | 'linkedin' | 'direct';
  date: string;
  projectType?: string;  // Type de projet réalisé
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

  // Vrais témoignages clients
  // ⚠️ IMPORTANT : Ne mettre ici QUE des vrais témoignages avec autorisation du client
  testimonials: Testimonial[] = [
    // ============================================
    // TEMPLATE : Copier ce bloc pour ajouter un nouveau témoignage
    // ============================================
    {
      id: 1,
      name: 'Un P\'tit Coup de Main',           // Nom du client ou de l'entreprise
      role: 'Gérant',                            // Rôle de la personne
      company: 'Un P\'tit Coup de Main',         // Nom de l'entreprise
      companyUrl: '',                            // URL du site (optionnel)
      ratings: {
        delais: 5,        // Note sur 5 : Respect des délais
        qualite: 5,       // Note sur 5 : Qualité du développement
        communication: 5, // Note sur 5 : Communication
        rapport: 5        // Note sur 5 : Rapport qualité/prix
      },
      averageRating: 5,   // Moyenne des 4 notes (calculer manuellement ou automatiquement)
      comment: 'En attente du témoignage client...',  // Le commentaire du client
      projectType: 'Site WordPress',             // Type de projet : Site WordPress, Application Angular, SaaS, etc.
      source: 'direct',                          // Source : google, malt, linkedin, trustpilot, direct
      date: 'Janvier 2026'                       // Date du témoignage
    }
    // ============================================
    // FIN DU TEMPLATE
    // ============================================
  ];

  // Labels pour les critères de notation
  criteriaLabels: { [key: string]: string } = {
    delais: 'Respect des délais',
    qualite: 'Qualité du code',
    communication: 'Communication',
    rapport: 'Rapport qualité/prix'
  };

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
      linkedin: '🔗',
      direct: '✉️'
    };
    return icons[source] || '⭐';
  }

  getSourceName(source: string): string {
    const names: { [key: string]: string } = {
      google: 'Google',
      trustpilot: 'Trustpilot',
      malt: 'Malt',
      linkedin: 'LinkedIn',
      direct: 'Témoignage direct'
    };
    return names[source] || source;
  }

  // Obtenir les critères sous forme de tableau pour l'affichage
  getCriteriaArray(ratings: RatingCriteria): { key: string, label: string, value: number }[] {
    return Object.keys(ratings).map(key => ({
      key,
      label: this.criteriaLabels[key] || key,
      value: ratings[key as keyof RatingCriteria]
    }));
  }

  // Vérifier si on a de vrais témoignages (pas en attente)
  hasRealTestimonials(): boolean {
    return this.testimonials.some(t => !t.comment.includes('En attente'));
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
