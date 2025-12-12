# Landing Page Micro-Entreprise - Angular 17 + TailwindCSS

Landing page moderne et responsive pour une micro-entreprise de développement web, développée avec **Angular 17+** et **TailwindCSS**.

##  Fonctionnalités

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

## E Build

```bash
# Build de production
npm run build

# Les fichiers compilés seront dans le dossier dist/mon-entreprise-landing/
```

##  Structure du projet

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
### Compétences techniques

Les compétences sont définies dans `src/app/app.component.ts` dans le tableau `skills`. Ajoutez ou supprimez des compétences selon vos besoins.


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
