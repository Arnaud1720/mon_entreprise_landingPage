import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mon Entreprise Landing';
  mobileMenuOpen = false;
  contactForm: FormGroup;
  formSubmitted = false;

  // Compétences techniques
  skills = [
    { name: 'Java 8 / 17 / 21', category: 'backend' },
    { name: 'Spring Boot', category: 'backend' },
    { name: 'Spring Security', category: 'backend' },
    { name: 'Spring Data JPA', category: 'backend' },
    { name: 'Hibernate', category: 'backend' },
    { name: 'Spring Batch', category: 'backend' },
    { name: 'Angular 17+', category: 'frontend' },
    { name: 'HTML5 / CSS3', category: 'frontend' },
    { name: 'TailwindCSS', category: 'frontend' },
    { name: 'WordPress', category: 'cms' },
    { name: 'Git / GitHub / GitLab', category: 'tools' },
    { name: 'Docker / docker-compose', category: 'devops' },
    { name: 'GitHub Actions', category: 'devops' },
    { name: 'MySQL / PostgreSQL', category: 'database' },
    { name: 'JUnit / Mockito', category: 'testing' },
    { name: 'Cypress E2E', category: 'testing' }
  ];

  // Process de travail
  processSteps = [
    {
      number: 1,
      title: 'Prise de contact & cadrage',
      description: 'Échange pour comprendre vos besoins, objectifs et contraintes.',
      icon: '💬'
    },
    {
      number: 2,
      title: 'Proposition & devis détaillé',
      description: 'Proposition technique et commerciale adaptée à votre projet.',
      icon: '📋'
    },
    {
      number: 3,
      title: 'Développement',
      description: 'Réalisation de votre projet avec points réguliers d\'avancement.',
      icon: '⚙️'
    },
    {
      number: 4,
      title: 'Recette & mise en ligne',
      description: 'Tests, validation et déploiement de votre solution.',
      icon: '🚀'
    },
    {
      number: 5,
      title: 'Formation & accompagnement',
      description: 'Formation pour une prise en main autonome et support post-livraison.',
      icon: '🎓'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      projectType: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.mobileMenuOpen = false;
    }
  }

  onSubmitContact() {
    if (this.contactForm.valid) {
      console.log('Formulaire soumis:', this.contactForm.value);
      this.formSubmitted = true;

      // Reset form après 3 secondes
      setTimeout(() => {
        this.formSubmitted = false;
        this.contactForm.reset();
      }, 3000);
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getSkillsByCategory(category: string) {
    return this.skills.filter(skill => skill.category === category);
  }
}
