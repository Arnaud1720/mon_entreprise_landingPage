import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, HostListener, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

/**
 * Composant Language Switcher avec drapeaux
 * Utilise Google Translate en arrière-plan avec une interface personnalisée
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-switcher-container">
      <!-- Bouton principal avec drapeau -->
      <button
        (click)="toggleDropdown()"
        class="lang-btn"
        [class.active]="isOpen">
        <span class="flag">{{ getCurrentFlag() }}</span>
        <svg
          class="chevron"
          [class.rotated]="isOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown avec les drapeaux -->
      <div *ngIf="isOpen" class="lang-dropdown">
        <div
          *ngFor="let lang of languages"
          (click)="selectLanguage(lang)"
          class="lang-item"
          [class.selected]="currentLang === lang.code">
          <span class="flag">{{ lang.flag }}</span>
          <span class="lang-name">{{ lang.name }}</span>
          <svg
            *ngIf="currentLang === lang.code"
            class="check-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <!-- Google Translate caché -->
      <div id="google_translate_element" style="display: none;"></div>
    </div>
  `,
  styles: [`
    .lang-switcher-container {
      position: relative;
    }

    .lang-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .lang-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .lang-btn.active {
      box-shadow: 0 0 0 2px rgba(167, 139, 250, 1);
    }

    .lang-btn .flag {
      font-size: 1.25rem;
      line-height: 1;
    }

    .lang-btn .chevron {
      width: 12px;
      height: 12px;
      color: #d1d5db;
      transition: transform 0.2s ease;
    }

    .lang-btn .chevron.rotated {
      transform: rotate(180deg);
    }

    .lang-dropdown {
      position: absolute;
      right: 0;
      margin-top: 8px;
      padding: 8px 0;
      width: 176px;
      background: rgba(17, 24, 39, 0.95);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      z-index: 50;
      animation: dropdownIn 0.2s ease-out forwards;
    }

    @keyframes dropdownIn {
      from {
        opacity: 0;
        transform: translateY(-8px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .lang-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .lang-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .lang-item.selected {
      background: rgba(139, 92, 246, 0.2);
    }

    .lang-item .flag {
      font-size: 1.25rem;
      line-height: 1;
    }

    .lang-item .lang-name {
      font-size: 0.875rem;
      color: #d1d5db;
    }

    .lang-item.selected .lang-name {
      color: #c4b5fd;
    }

    .lang-item .check-icon {
      width: 16px;
      height: 16px;
      margin-left: auto;
      color: #a78bfa;
    }

    /* Masquer complètement le widget Google */
    :host ::ng-deep .goog-te-gadget,
    :host ::ng-deep .goog-te-banner-frame,
    :host ::ng-deep .skiptranslate {
      display: none !important;
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit, AfterViewInit {
  private scriptLoaded = false;
  isOpen = false;
  currentLang = 'fr';

  languages: Language[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleTranslate();
      this.detectCurrentLanguage();
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  getCurrentFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLang);
    return lang ? lang.flag : '🇫🇷';
  }

  selectLanguage(lang: Language): void {
    this.currentLang = lang.code;
    this.isOpen = false;
    this.triggerGoogleTranslate(lang.code);
  }

  private triggerGoogleTranslate(langCode: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Utiliser le cookie Google Translate pour changer la langue
    const googleTranslateCookie = `/fr/${langCode}`;

    // Mettre à jour le cookie
    document.cookie = `googtrans=${googleTranslateCookie}; path=/`;
    document.cookie = `googtrans=${googleTranslateCookie}; path=/; domain=${window.location.hostname}`;

    // Simuler le changement via le select Google Translate
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Si le select n'est pas encore chargé, recharger la page avec le cookie
      if (langCode !== 'fr') {
        window.location.reload();
      } else {
        // Pour revenir au français, supprimer le cookie et recharger
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        window.location.reload();
      }
    }
  }

  private detectCurrentLanguage(): void {
    // Détecter la langue actuelle depuis le cookie
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'googtrans' && value) {
        const langMatch = value.match(/\/fr\/(\w+)/);
        if (langMatch && langMatch[1]) {
          this.currentLang = langMatch[1];
          return;
        }
      }
    }
    this.currentLang = 'fr';
  }

  private loadGoogleTranslate(): void {
    if (this.scriptLoaded) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'fr,en,es,de,it,pt',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    this.scriptLoaded = true;
  }
}
