import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CodeParticle {
  x: number;
  y: number;
  symbol: string;
  color: string;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('matrixCanvas', { static: false }) matrixCanvas!: ElementRef<HTMLCanvasElement>;

  currentYear = new Date().getFullYear();
 //test
  // Particules de code flottantes
  codeParticles: CodeParticle[] = [];

  // Curseur binaire
  isFooterHovered = false;
  showBinaryCursor = true;
  cursorX = 0;
  cursorY = 0;
  cursorBinary = '01';

  // Animation Matrix
  private animationId: number | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private columns: number[] = [];
  private binaryInterval: ReturnType<typeof setInterval> | null = null;

  // Symboles de développement
  private readonly codeSymbols = [
    '</>',  '{ }', '[ ]', '( )', '&&', '||', '=>', '++', '--',
    '===', '!=', '0', '1', '#', '$', '@', '%', '/*', '*/',
    'fn', 'if', 'for', '::',  '<?', '?>', '|>', '<|'
  ];

  private readonly symbolColors = [
    'text-blue-400',
    'text-purple-400',
    'text-cyan-400',
    'text-green-400',
    'text-pink-400'
  ];

  ngOnInit(): void {
    this.generateCodeParticles();
    this.startBinaryAnimation();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMatrixRain(), 100);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.binaryInterval) {
      clearInterval(this.binaryInterval);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onFooterHover(isHovered: boolean): void {
    this.isFooterHovered = isHovered;
  }

  onMouseMove(event: MouseEvent): void {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }

  private generateCodeParticles(): void {
    const particleCount = 15;
    this.codeParticles = [];

    for (let i = 0; i < particleCount; i++) {
      this.codeParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        symbol: this.codeSymbols[Math.floor(Math.random() * this.codeSymbols.length)],
        color: this.symbolColors[Math.floor(Math.random() * this.symbolColors.length)],
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 12
      });
    }
  }

  private startBinaryAnimation(): void {
    this.binaryInterval = setInterval(() => {
      // Générer une séquence binaire aléatoire
      const length = 2 + Math.floor(Math.random() * 3);
      this.cursorBinary = Array.from({ length }, () =>
        Math.random() > 0.5 ? '1' : '0'
      ).join('');
    }, 150);
  }

  private initMatrixRain(): void {
    if (!this.matrixCanvas?.nativeElement) return;

    const canvas = this.matrixCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    const resizeCanvas = () => {
      const footer = canvas.parentElement;
      if (footer) {
        canvas.width = footer.offsetWidth;
        canvas.height = footer.offsetHeight;
        this.initColumns();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    this.animateMatrix();
  }

  private initColumns(): void {
    if (!this.matrixCanvas?.nativeElement) return;
    const canvas = this.matrixCanvas.nativeElement;
    const fontSize = 14;
    const columnCount = Math.floor(canvas.width / fontSize);
    this.columns = Array(columnCount).fill(1);
  }

  private animateMatrix(): void {
    if (!this.ctx || !this.matrixCanvas?.nativeElement) return;

    const canvas = this.matrixCanvas.nativeElement;
    const fontSize = 14;

    // Fond semi-transparent pour l'effet de traînée
    this.ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Couleurs modernes pour les caractères
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];

    this.ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      // Caractères binaires et symboles de code
      const chars = '01<>/{}[]()=>;:#$@%&|+-*';
      const char = chars[Math.floor(Math.random() * chars.length)];

      // Couleur aléatoire parmi les couleurs modernes
      this.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

      const x = i * fontSize;
      const y = this.columns[i] * fontSize;

      this.ctx.fillText(char, x, y);

      // Reset de la colonne si elle atteint le bas
      if (y > canvas.height && Math.random() > 0.975) {
        this.columns[i] = 0;
      }

      this.columns[i]++;
    }

    this.animationId = requestAnimationFrame(() => this.animateMatrix());
  }
}
