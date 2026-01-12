import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
  scrollProgress: number;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <!-- Décorations de fond -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Questions <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Fréquentes</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Cliquez sur une question et utilisez la molette pour révéler la réponse
          </p>
        </div>

        <!-- FAQ Items -->
        <div class="max-w-3xl mx-auto space-y-4">
          <div
            *ngFor="let item of faqItems; let i = index"
            class="faq-item rounded-2xl overflow-hidden transition-all duration-500"
            [class.faq-open]="item.isOpen"
          >
            <!-- Question Header -->
            <button
              (click)="toggleFaq(i)"
              class="w-full px-6 py-5 flex items-center justify-between text-left group"
              [class]="item.isOpen ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : 'bg-white/5 hover:bg-white/10'"
            >
              <div class="flex items-center gap-4">
                <span
                  class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  [class]="item.isOpen ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-white/10 text-gray-400'"
                >
                  {{ i + 1 }}
                </span>
                <span class="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {{ item.question }}
                </span>
              </div>

              <div
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                [class]="item.isOpen ? 'bg-purple-500/20 rotate-180' : 'bg-white/10'"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>

            <!-- Answer Container - Zone FIXE qui capture le scroll -->
            <div
              *ngIf="item.isOpen"
              class="answer-container"
              (wheel)="onWheel($event, i)"
            >
              <!-- Barre de progression sticky en haut -->
              <div class="px-6 py-3 bg-gray-800/50 border-b border-white/10">
                <div class="flex items-center gap-4">
                  <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-150 ease-out"
                      [class]="item.scrollProgress >= 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'"
                      [style.width.%]="item.scrollProgress"
                    ></div>
                  </div>
                  <div class="flex items-center gap-2 min-w-[70px] justify-end">
                    <span
                      class="text-sm font-mono font-bold"
                      [class]="item.scrollProgress >= 100 ? 'text-green-400' : 'text-purple-400'"
                    >
                      {{ item.scrollProgress | number:'1.0-0' }}%
                    </span>
                    <svg
                      *ngIf="item.scrollProgress >= 100"
                      class="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Zone de réponse FIXE (pas de scroll) -->
              <div class="p-6">
                <!-- Terminal -->
                <div class="bg-black/50 rounded-xl border border-white/10 overflow-hidden">
                  <!-- Header du terminal -->
                  <div class="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-white/10">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="ml-3 text-xs text-gray-500 font-mono">réponse.txt</span>
                    <div class="ml-auto flex items-center gap-2 text-xs text-gray-600">
                      <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                      <span>Molette pour révéler</span>
                    </div>
                  </div>

                  <!-- Corps du terminal avec texte qui se révèle -->
                  <div class="p-5 min-h-[120px]">
                    <p class="text-gray-200 leading-relaxed">
                      <span
                        *ngFor="let char of getAnswerChars(item.answer); let j = index"
                        class="char-reveal"
                        [class.visible]="j < getVisibleChars(item)"
                      >{{ char }}</span>
                      <span
                        *ngIf="item.scrollProgress < 100"
                        class="cursor-blink"
                      >|</span>
                    </p>

                    <!-- Message de succès -->
                    <div
                      *ngIf="item.scrollProgress >= 100"
                      class="mt-4 pt-4 border-t border-green-500/30 flex items-center gap-2 text-green-400 text-sm animate-fade-in"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Réponse complète !
                    </div>
                  </div>
                </div>

                <!-- Indication scroll -->
                <div
                  *ngIf="item.scrollProgress < 100"
                  class="mt-4 flex justify-center"
                >
                  <div class="flex items-center gap-2 text-gray-500 text-sm px-4 py-2 rounded-full bg-white/5">
                    <div class="scroll-indicator">
                      <div class="scroll-wheel"></div>
                    </div>
                    <span>Scrollez avec la molette</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
          <p class="text-gray-400 mb-4">Vous avez d'autres questions ?</p>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            Contactez-moi
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.02);
    }

    .faq-item:hover {
      border-color: rgba(139, 92, 246, 0.3);
    }

    .faq-open {
      border-color: rgba(139, 92, 246, 0.5);
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
    }

    .answer-container {
      animation: slideDown 0.4s ease-out forwards;
      background: rgba(0, 0, 0, 0.2);
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        max-height: 0;
      }
      to {
        opacity: 1;
        max-height: 500px;
      }
    }

    /* Caractères qui apparaissent */
    .char-reveal {
      opacity: 0;
      transition: opacity 0.08s ease;
    }

    .char-reveal.visible {
      opacity: 1;
    }

    /* Curseur clignotant */
    .cursor-blink {
      color: #8B5CF6;
      animation: blink 0.7s infinite;
      font-weight: bold;
      margin-left: 2px;
    }

    @keyframes blink {
      0%, 45% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    /* Animation fade in pour le message de succès */
    .animate-fade-in {
      animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Indicateur de scroll (souris animée) */
    .scroll-indicator {
      width: 20px;
      height: 32px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      position: relative;
    }

    .scroll-wheel {
      width: 4px;
      height: 8px;
      background: #8B5CF6;
      border-radius: 2px;
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      animation: scrollWheel 1.5s infinite;
    }

    @keyframes scrollWheel {
      0% { top: 6px; opacity: 1; }
      100% { top: 16px; opacity: 0; }
    }
  `]
})
export class FaqComponent {
  activeFaqIndex: number | null = null;

  faqItems: FaqItem[] = [
    {
      question: 'Combien coûte un site vitrine ?',
      answer: 'Le tarif d\'un site vitrine démarre à partir de 800€ et peut aller jusqu\'à 3000€ selon les fonctionnalités souhaitées (nombre de pages, formulaires, intégrations, animations...). Chaque projet est unique et fait l\'objet d\'un devis personnalisé gratuit après notre premier échange.',
      isOpen: false,
      scrollProgress: 0
    },
    {
      question: 'Quels sont vos délais de livraison ?',
      answer: 'Les délais varient selon la complexité du projet. Un site vitrine simple est livré en 2 à 3 semaines. Une application web sur mesure peut prendre 1 à 3 mois. Je m\'engage toujours sur un planning précis dès le début du projet, avec des points d\'avancement réguliers.',
      isOpen: false,
      scrollProgress: 0
    },
    {
      question: 'Proposez-vous la maintenance du site ?',
      answer: 'Oui, je propose des forfaits de maintenance mensuels incluant : mises à jour de sécurité, sauvegardes régulières, corrections de bugs, petites modifications de contenu et support technique prioritaire. C\'est la garantie d\'un site toujours à jour et sécurisé.',
      isOpen: false,
      scrollProgress: 0
    },
    {
      question: 'Travaillez-vous uniquement sur Bordeaux ?',
      answer: 'Basé à Saint-Médard-en-Jalles près de Bordeaux, j\'interviens principalement en Gironde et Nouvelle-Aquitaine pour les rendez-vous en présentiel. Cependant, je travaille régulièrement avec des clients partout en France grâce aux outils de visioconférence et de collaboration à distance.',
      isOpen: false,
      scrollProgress: 0
    },
    {
      question: 'Quelles technologies utilisez-vous ?',
      answer: 'Je maîtrise un large éventail de technologies : WordPress pour les sites vitrines administrables, Angular et React pour les interfaces modernes, Java/Spring Boot pour les backends robustes, et bien d\'autres (Node.js, TypeScript, Tailwind CSS...). Le choix dépend de vos besoins spécifiques.',
      isOpen: false,
      scrollProgress: 0
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleFaq(index: number): void {
    this.faqItems.forEach((item, i) => {
      if (i !== index) {
        item.isOpen = false;
        item.scrollProgress = 0;
      }
    });

    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
    if (this.faqItems[index].isOpen) {
      this.faqItems[index].scrollProgress = 0;
      this.activeFaqIndex = index;
    } else {
      this.activeFaqIndex = null;
    }
  }

  // Capture l'événement wheel (molette) sans faire défiler la page
  onWheel(event: WheelEvent, index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Empêcher le scroll de la page
    event.preventDefault();
    event.stopPropagation();

    const item = this.faqItems[index];

    // Calculer l'incrément (deltaY positif = scroll vers le bas)
    const increment = event.deltaY > 0 ? 3 : -3;

    // Mettre à jour la progression
    item.scrollProgress = Math.max(0, Math.min(100, item.scrollProgress + increment));
  }

  getAnswerChars(answer: string): string[] {
    return answer.split('');
  }

  getVisibleChars(item: FaqItem): number {
    const totalChars = item.answer.length;
    return Math.floor((item.scrollProgress / 100) * totalChars);
  }
}
