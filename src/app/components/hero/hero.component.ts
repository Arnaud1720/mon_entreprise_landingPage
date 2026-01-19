import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  constructor(private analytics: AnalyticsService) {}

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // Tracking GA4
      if (sectionId === 'contact') {
        this.analytics.trackContactClick('hero_cta');
      } else {
        this.analytics.trackSectionScroll(sectionId);
      }
    }
  }
}
