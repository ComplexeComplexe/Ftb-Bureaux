# Formulaire de Création d'Annonce - French Tech Barcelona

## Vue d'ensemble

Ce formulaire complet permet aux utilisateurs de créer et publier des annonces d'espaces de travail sur la plateforme French Tech Barcelona Offices. Il suit le même design et la même architecture que les autres pages de l'application.

## Architecture

### Structure des fichiers
```
src/
├── app/
│   ├── offices/
│   │   └── create/
│   │       └── page.tsx          # Page principale de création
│   └── create-demo/
│       └── page.tsx              # Page de démonstration
├── components/
│   └── office/
│       ├── CreateHeader.tsx      # Header de la page de création
│       ├── RadioGroup.tsx        # Groupe de boutons radio stylisés
│       ├── CapacitySlider.tsx    # Slider pour la capacité
│       ├── PhotoUpload.tsx       # Zone d'upload de photos
│       └── index.ts              # Export des composants
```

## Composants

### CreateHeader
- Header sticky avec titre et bouton retour
- Indicateur de statut (Brouillon)
- Navigation vers la liste des espaces

### RadioGroup
- Boutons radio stylisés avec le design French Tech
- Support des descriptions pour chaque option
- Gestion des erreurs de validation
- Animation et hover effects

### CapacitySlider
- Slider interactif pour la capacité (1-50 personnes)
- Affichage de la valeur en temps réel
- Styles cohérents avec la charte graphique

### PhotoUpload
- Zone de drag & drop pour les photos
- Preview des images uploadées
- Limite de 5 photos maximum
- Suppression individuelle des photos
- Validation des types de fichiers

## Sections du Formulaire

### 1. Informations de base
- **Titre de l'annonce** : Input texte avec validation (min 5 caractères)
- **Type de bureau** : Radio buttons (Bureau partagé/Privé)
- **Quartier** : Select avec les quartiers de Barcelone

### 2. Détails
- **Prix mensuel** : Input number (100€ - 1000€)
- **Surface** : Input number (min 10m²)
- **Capacité** : Slider (1-50 personnes)

### 3. Équipements
- **Checkboxes avec icônes** :
  - WiFi haut débit
  - Parking
  - Salle de réunion
  - Cuisine équipée
  - Terrasse
  - Climatisation

### 4. Description
- **Textarea** avec placeholder détaillé
- **Compteur de caractères** (minimum 50)
- **Validation en temps réel**

### 5. Photos
- **Zone drag & drop** avec instructions
- **Preview des images** en grille
- **Limite de 5 photos**
- **Suppression individuelle**

### 6. Disponibilité
- **Date de disponibilité** : Date picker
- **Durée minimum** : Select (1, 3, 6, 12 mois)

## Validation

### Schéma Zod
```typescript
const createOfficeSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  officeType: z.enum(['shared', 'private']),
  neighborhood: z.string().min(1, 'Veuillez sélectionner un quartier'),
  price: z.number().min(100).max(1000),
  surface: z.number().min(10),
  capacity: z.number().min(1).max(50),
  amenities: z.array(z.string()).min(1),
  description: z.string().min(50),
  availableFrom: z.string().min(1),
  minDuration: z.string().min(1),
});
```

### Règles de validation
- Tous les champs sont requis
- Prix entre 100€ et 1000€
- Surface minimum 10m²
- Capacité entre 1 et 50 personnes
- Au moins 1 équipement sélectionné
- Description minimum 50 caractères
- Au moins 1 photo

## Fonctionnalités

### Gestion des états
- **Validation en temps réel** avec `mode: 'onChange'`
- **États de chargement** sur les boutons
- **Gestion des erreurs** par champ
- **Indicateur de progression** dans le footer

### Interactions utilisateur
- **Formulaires réactifs** avec react-hook-form
- **Validation côté client** avec Zod
- **Gestion des photos** avec drag & drop
- **Navigation intuitive** entre les sections

### Footer sticky
- **Bouton Aperçu** (secondary) pour prévisualiser
- **Bouton Publier** (primary) pour soumettre
- **Indicateur de complétude** du formulaire
- **États désactivés** selon la validation

## Design et UX

### Style cohérent
- **Palette French Tech** : `french-tech-blue`, `french-tech-red`
- **Typographie** : Manrope + Noto Sans
- **Composants** : Cards blanches avec `shadow-sm`
- **Espacements** : Système de spacing cohérent

### Responsive
- **Mobile-first** design
- **Grid adaptatif** pour les sections
- **Navigation tactile** optimisée
- **Footer sticky** sur tous les écrans

### Accessibilité
- **Labels appropriés** pour tous les champs
- **Messages d'erreur** clairs et en français
- **Navigation au clavier** supportée
- **ARIA labels** pour les composants complexes

## Intégration

### Composants réutilisables
- Utilise les composants d'authentification existants
- **FormInput**, **Checkbox**, **AuthButton**
- Cohérence visuelle avec le reste de l'application

### Validation
- **Zod** pour la validation des schémas
- **react-hook-form** pour la gestion des formulaires
- **Messages d'erreur** en français

### Navigation
- **Next.js Router** pour les redirections
- **Bouton retour** vers la liste des espaces
- **Redirection** après création réussie

## Utilisation

### Test du formulaire
1. Accéder à `/create-demo` pour la démonstration
2. Cliquer sur "Tester le Formulaire de Création"
3. Remplir les différentes sections
4. Tester la validation et les interactions

### Développement
- **Composants modulaires** facilement extensibles
- **Validation configurable** via le schéma Zod
- **Styles personnalisables** via Tailwind CSS
- **Architecture scalable** pour de futures fonctionnalités

## Développement futur

### Fonctionnalités prévues
- **Sauvegarde automatique** des brouillons
- **Prévisualisation en temps réel**
- **Upload multiple** de photos
- **Géolocalisation** automatique
- **Suggestions intelligentes** pour les descriptions

### Améliorations techniques
- **Tests unitaires** pour les composants
- **Validation côté serveur** avec Supabase
- **Gestion des erreurs** réseau
- **Optimisation des performances**
- **PWA** pour l'upload de photos

## Support

Pour toute question sur le formulaire de création :
- Consultez les composants dans `src/components/office/`
- Testez via la page de démonstration `/create-demo`
- Vérifiez la validation dans le schéma Zod
- Consultez la documentation des composants d'authentification
