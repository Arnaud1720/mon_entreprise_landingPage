import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service de protection des vidéos
 *
 * Protections incluses (dissuasives, pas infaillibles) :
 * - Désactive le clic droit sur les vidéos
 * - Empêche le glisser-déposer
 * - Bloque les raccourcis clavier de téléchargement
 * - Ajoute un overlay transparent pour bloquer l'interaction directe
 *
 * Note: Ces protections bloquent 95% des utilisateurs lambda
 * mais ne peuvent pas empêcher un développeur déterminé.
 */
@Injectable({
  providedIn: 'root'
})
export class VideoProtectionService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Applique toutes les protections sur un élément vidéo
   */
  protectVideo(videoElement: HTMLVideoElement): void {
    if (!isPlatformBrowser(this.platformId) || !videoElement) return;

    // Désactiver le clic droit
    videoElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Empêcher le glisser-déposer
    videoElement.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    // Désactiver la sélection
    videoElement.style.userSelect = 'none';
    videoElement.style.webkitUserSelect = 'none';

    // Supprimer le bouton de téléchargement natif
    videoElement.setAttribute('controlsList', 'nodownload noplaybackrate');

    // Désactiver le picture-in-picture (empêche extraction facile)
    videoElement.setAttribute('disablePictureInPicture', 'true');
  }

  /**
   * Applique les protections sur le conteneur vidéo
   */
  protectContainer(containerElement: HTMLElement): void {
    if (!isPlatformBrowser(this.platformId) || !containerElement) return;

    // Désactiver le clic droit sur tout le conteneur
    containerElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Bloquer certains raccourcis clavier
    containerElement.addEventListener('keydown', (e) => {
      // Bloquer Ctrl+S (sauvegarder)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      // Bloquer Ctrl+Shift+I (outils développeur)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      return true;
    });
  }

  /**
   * Crée un overlay transparent de protection
   * L'overlay intercepte les clics mais laisse passer les contrôles vidéo
   */
  createProtectionOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.className = 'video-protection-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 40px);
      background: transparent;
      z-index: 10;
      cursor: pointer;
    `;

    // Permettre le play/pause au clic
    overlay.addEventListener('click', (e) => {
      const video = (e.target as HTMLElement).parentElement?.querySelector('video');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });

    return overlay;
  }

  /**
   * Initialise toutes les protections sur un conteneur vidéo
   */
  initProtection(containerElement: HTMLElement): void {
    if (!isPlatformBrowser(this.platformId) || !containerElement) return;

    const video = containerElement.querySelector('video');

    if (video) {
      this.protectVideo(video);
    }

    this.protectContainer(containerElement);

    // Ajouter l'overlay si pas déjà présent
    if (!containerElement.querySelector('.video-protection-overlay')) {
      const wrapper = (containerElement.querySelector('.video-wrapper') || containerElement) as HTMLElement;
      wrapper.style.position = 'relative';
      wrapper.appendChild(this.createProtectionOverlay());
    }
  }
}
