# Landing Page Micro-Entreprise - Angular 17 + TailwindCSS

Landing page moderne et responsive pour une micro-entreprise de développement web, développée avec **Angular 17+** et **TailwindCSS**.

## 🚀 Fonctionnalités

- ✅ **Design moderne et responsive** (mobile-first)
- ✅ **Single Page Application** (SPA) avec navigation par ancres
- ✅ **Menu burger** sur mobile
- ✅ **Sections complètes** :
  - Header avec navigation sticky
  - Hero avec CTAs
  - Services (WordPress + Java/Spring/Angular)
  - Maintenance & accompagnement
  - Process de travail (timeline)
  - À propos avec compétences techniques
  - Formulaire de contact (démo sans backend)
  - Footer complet
- ✅ **TailwindCSS** pour le styling
- ✅ **Angular 17+ standalone components**
- ✅ **Formulaire réactif** avec validation

## 📋 Prérequis

- Node.js 18+ (testé avec v22.21.1)
- npm 10+ (testé avec v10.9.4)

## 🛠️ Installation

```bash
# Installer les dépendances
npm install
```

## 🚀 Démarrage

```bash
# Lancer le serveur de développement
npm start

# L'application sera disponible sur http://localhost:4200/
```

## 🏗️ Build

```bash
# Build de production
npm run build

# Les fichiers compilés seront dans le dossier dist/mon-entreprise-landing/
```

## 📁 Structure du projet

```
mon_entreprise_landingPage/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Composant principal avec la logique
│   │   ├── app.component.html     # Template HTML de la landing page
│   │   └── app.component.css      # Styles spécifiques au composant
│   ├── assets/                    # Assets statiques
│   ├── index.html                 # Point d'entrée HTML
│   ├── main.ts                    # Bootstrap de l'application
│   └── styles.css                 # Styles globaux avec TailwindCSS
├── angular.json                   # Configuration Angular
├── tailwind.config.js             # Configuration TailwindCSS
├── postcss.config.js              # Configuration PostCSS
├── tsconfig.json                  # Configuration TypeScript
└── package.json                   # Dépendances npm
```

## 🎨 Personnalisation

### Informations de l'entreprise

Pour personnaliser les informations de votre entreprise, modifiez les placeholders dans `src/app/app.component.html` :

- `[Nom de la micro-entreprise]` → Remplacer par le nom de votre entreprise
- `[Ton Prénom Nom]` → Remplacer par votre nom
- `[ton.email&#64;pro.fr]` → Remplacer par votre email (en conservant `&#64;` pour le @)
- `[06 xx xx xx xx]` → Remplacer par votre numéro de téléphone
- `[votre-profil]` → Remplacer par votre profil Malt

### Couleurs

Les couleurs principales sont définies dans `tailwind.config.js`. Modifiez la palette `primary` pour changer le thème :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Personnalisez ici
      }
    }
  }
}
```

### Compétences techniques

Les compétences sont définies dans `src/app/app.component.ts` dans le tableau `skills`. Ajoutez ou supprimez des compétences selon vos besoins.

## 📝 Formulaire de contact

Le formulaire de contact est actuellement en mode **démo** :
- Il affiche les données dans la console du navigateur
- Aucun email n'est envoyé
- Pour une vraie intégration, vous devrez :
  - Ajouter un backend (Node.js, PHP, etc.)
  - Ou utiliser un service tiers (EmailJS, Formspree, etc.)

## 🎯 Technologies utilisées

- **Angular 17.3** - Framework frontend
- **TailwindCSS 3.4** - Framework CSS utility-first
- **TypeScript 5.4** - Langage typé
- **RxJS 7.8** - Programmation réactive
- **PostCSS** - Transformations CSS

## 📦 Build de production

Le build de production génère des fichiers optimisés :
- Minification JavaScript et CSS
- Tree-shaking pour réduire la taille
- Hashing des fichiers pour le cache
- Optimisation des images

## 🌐 Déploiement

Vous pouvez déployer cette application sur :
- **Netlify** : Glissez-déposez le dossier `dist/mon-entreprise-landing`
- **Vercel** : Connectez votre repo GitHub
- **GitHub Pages** : Utilisez `angular-cli-ghpages`
- **Firebase Hosting** : Utilisez `firebase deploy`

## 📄 Licence

Ce projet est un exemple/template pour une landing page de micro-entreprise.

## 👤 Auteur

Développé avec Angular 17+ et TailwindCSS pour une micro-entreprise de développement web.

---

**Note** : Ce projet est une landing page statique sans backend. Pour ajouter des fonctionnalités comme l'envoi d'emails, vous devrez intégrer un service backend ou utiliser des services tiers.
