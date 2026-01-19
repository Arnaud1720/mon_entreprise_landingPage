import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-mon-approche',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mon-approche.component.html',
  styleUrls: ['./mon-approche.component.css']
})
export class MonApprocheComponent implements OnInit {

  // Les étapes de ma méthodologie
  etapes = [
    {
      numero: 1,
      titre: 'Écoute & Compréhension',
      iconType: 'ear',
      description: 'Tout commence par un échange approfondi. Je prends le temps de comprendre votre activité, vos objectifs, vos contraintes et votre vision.',
      details: [
        'Appel découverte gratuit de 30 minutes',
        'Questions ciblées pour cerner vos besoins réels',
        'Analyse de votre contexte métier',
        'Identification des priorités et des contraintes'
      ]
    },
    {
      numero: 2,
      titre: 'Co-construction du Projet',
      iconType: 'document',
      description: 'Ensemble, nous mettons sur papier les fonctionnalités, le design et les spécifications. Vous êtes acteur du projet, pas spectateur.',
      details: [
        'Rédaction collaborative du cahier des charges',
        'Maquettes et wireframes pour visualiser le résultat',
        'Validation de chaque fonctionnalité ensemble',
        'Devis détaillé et transparent, sans surprise'
      ]
    },
    {
      numero: 3,
      titre: 'Développement Itératif',
      iconType: 'code',
      description: 'Je développe par étapes avec des livraisons régulières. Vous voyez le projet avancer et pouvez donner votre avis à chaque étape.',
      details: [
        'Livraisons intermédiaires pour validation',
        'Accès à un environnement de prévisualisation',
        'Ajustements en temps réel selon vos retours',
        'Code propre et maintenable'
      ]
    },
    {
      numero: 4,
      titre: 'Points Réguliers',
      iconType: 'calendar',
      description: 'Communication transparente avec des points hebdomadaires adaptés à votre disponibilité. Vous savez toujours où en est votre projet.',
      details: [
        'Points visio ou téléphone selon vos préférences',
        'Compte-rendu écrit après chaque échange',
        'Disponibilité pour répondre à vos questions',
        'Alertes proactives en cas de blocage'
      ]
    },
    {
      numero: 5,
      titre: 'Livraison & Accompagnement',
      iconType: 'check',
      description: 'La livraison n\'est pas la fin de notre collaboration. Je vous accompagne pour la prise en main et reste disponible après.',
      details: [
        'Formation à l\'utilisation de votre outil',
        'Documentation technique fournie',
        'Support post-livraison inclus',
        'Maintenance et évolutions possibles'
      ]
    }
  ];

  // Mes engagements
  engagements = [
    {
      iconType: 'handshake',
      titre: 'Relation de confiance',
      description: 'Pas de jargon technique inutile. Je vous explique clairement les choix et vous implique dans les décisions.'
    },
    {
      iconType: 'clock',
      titre: 'Respect des délais',
      description: 'Je m\'engage sur un planning réaliste et je vous tiens informé de l\'avancement. Pas de mauvaises surprises.'
    },
    {
      iconType: 'chat',
      titre: 'Communication directe',
      description: 'Vous travaillez directement avec moi, pas avec un commercial ou un intermédiaire. Un seul interlocuteur du début à la fin.'
    },
    {
      iconType: 'shield',
      titre: 'Qualité sans compromis',
      description: 'Code propre, bonnes pratiques, tests rigoureux. Votre projet est construit pour durer et évoluer.'
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Mon Approche - Méthodologie de Travail | NonoDevCo - Développeur Freelance Bordeaux',
      description: 'Découvrez ma méthode de travail : écoute client, co-construction du projet, points réguliers et accompagnement. Développeur web freelance à Bordeaux, je travaille avec vous, pas pour vous.',
      keywords: 'méthodologie développeur freelance, approche collaborative, développeur bordeaux, cahier des charges, accompagnement projet web, freelance transparent',
      author: 'Arnaud Derisbourg',
      type: 'website',
      url: 'https://nonodevco.com/mon-approche',
      image: 'https://nonodevco.com/assets/og-image.jpg'
    });

    window.scrollTo(0, 0);
  }

  scrollToContact() {
    window.location.href = '/#contact';
  }
}
