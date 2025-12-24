import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit, OnDestroy {
  bookingVisible = false;
  private observer: IntersectionObserver | null = null;

  calendlyUrl = 'https://calendly.com/derisbourgarnaud/30min';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.loadCalendlyScript();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.bookingVisible = true;
        }
      });
    }, options);

    const element = document.getElementById('booking');
    if (element) {
      this.observer.observe(element);
    }
  }

  private loadCalendlyScript(): void {
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  openCalendlyPopup(): void {
    if (isPlatformBrowser(this.platformId) && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: this.calendlyUrl
      });
    } else {
      window.open(this.calendlyUrl, '_blank');
    }
  }
}
