import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { VideoProtectionService } from '../../services/video-protection/video-protection.service';

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
export class PortfolioComponent implements OnInit, OnDestroy, AfterViewInit {
  portfolioVisible = false;
  private observer: IntersectionObserver | null = null;

  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLDivElement>;

  // Vidéos du projet
  videos: Video[] = [
    { src: '/assets/portfolio/video_1.mp4', title: 'Connexion et authentification' },
    { src: '/assets/portfolio/video_2.mp4', title: 'Dashboard administrateur' },
    { src: '/assets/portfolio/video_3.mp4', title: 'Gestion des patients' },
    { src: '/assets/portfolio/video_4.mp4', title: 'Gestion des médecins' },
    { src: '/assets/portfolio/video_5.mp4', title: 'Prise de rendez-vous' },
    { src: '/assets/portfolio/video_6.mp4', title: 'Interface utilisateur' },
    { src: '/assets/portfolio/video_7.mp4', title: 'Fonctionnalités avancées' }
  ];

  selectedVideo: string = this.videos[0].src;
  selectedVideoTitle: string = this.videos[0].title;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private videoProtection: VideoProtectionService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Appliquer la protection après le rendu
      setTimeout(() => this.applyVideoProtection(), 500);
    }
  }

  /**
   * Applique les protections sur la vidéo
   */
  private applyVideoProtection(): void {
    const container = document.querySelector('.video-container');
    if (container) {
      this.videoProtection.initProtection(container as HTMLElement);
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
    // Réappliquer la protection après changement de vidéo
    setTimeout(() => this.applyVideoProtection(), 100);
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
