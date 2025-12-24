import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Video {
  src: string;
  title: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  portfolioVisible = false;
  private observer: IntersectionObserver | null = null;

  // Vidéos du projet
  videos: Video[] = [
    { src: 'assets/portfolio/video_1.mp4', title: 'Connexion et authentification' },
    { src: 'assets/portfolio/video_2.mp4', title: 'Dashboard administrateur' },
    { src: 'assets/portfolio/video_3.mp4', title: 'Gestion des patients' },
    { src: 'assets/portfolio/video_4.mp4', title: 'Gestion des médecins' },
    { src: 'assets/portfolio/video_5.mp4', title: 'Prise de rendez-vous' },
    { src: 'assets/portfolio/video_6.mp4', title: 'Interface utilisateur' },
    { src: 'assets/portfolio/video_7.mp4', title: 'Fonctionnalités avancées' }
  ];

  selectedVideo: string = this.videos[0].src;
  selectedVideoTitle: string = this.videos[0].title;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
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
          this.portfolioVisible = true;
        }
      });
    }, options);

    const element = document.getElementById('portfolio');
    if (element) {
      this.observer.observe(element);
    }
  }

  selectVideo(video: Video): void {
    this.selectedVideo = video.src;
    this.selectedVideoTitle = video.title;
  }

  getVideoIndex(): number {
    return this.videos.findIndex(v => v.src === this.selectedVideo);
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
