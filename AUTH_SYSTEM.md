# Système d'Authentification French Tech Barcelona

## Vue d'ensemble

Ce système d'authentification complet est conçu pour la plateforme French Tech Barcelona Offices, utilisant Next.js 14, Supabase Auth, et un design cohérent avec la charte graphique French Tech.

## Architecture

### Structure des dossiers
```
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx          # Layout d'authentification
│   │   ├── login/
│   │   │   └── page.tsx        # Page de connexion
│   │   └── signup/
│   │       └── page.tsx        # Page d'inscription
│   └── auth-demo/
│       └── page.tsx            # Page de démonstration
├── components/
│   └── auth/
│       ├── FormInput.tsx       # Input standard avec validation
│       ├── PasswordInput.tsx   # Input mot de passe avec toggle
│       ├── Checkbox.tsx        # Checkbox stylisée
│       ├── AuthButton.tsx      # Bouton avec loading state
│       ├── ErrorMessage.tsx    # Affichage des erreurs
│       ├── ProtectedRoute.tsx  # Protection des routes
│       └── UserMenu.tsx        # Menu utilisateur
└── hooks/
    └── useAuth.ts              # Hook d'authentification
```

## Composants

### FormInput
- Input standard avec validation et gestion des erreurs
- Styles cohérents avec la charte French Tech
- Support de tous les types d'input HTML

### PasswordInput
- Input spécialisé pour les mots de passe
- Toggle de visibilité avec icône
- Validation et gestion des erreurs

### Checkbox
- Checkbox stylisée avec le design French Tech
- Support des labels complexes (HTML)
- Gestion des erreurs de validation

### AuthButton
- Bouton d'authentification avec variantes
- États de chargement avec spinner
- Styles cohérents et accessibilité

### ErrorMessage
- Affichage uniforme des messages d'erreur
- Couleurs et styles French Tech
- Support des erreurs générales et de champ

### ProtectedRoute
- Protection des routes pour utilisateurs authentifiés
- Redirection automatique vers la connexion
- Loader pendant la vérification

### UserMenu
- Menu utilisateur avec dropdown
- Affichage des informations utilisateur
- Navigation vers les pages protégées
- Déconnexion sécurisée

## Hook useAuth

### Fonctionnalités
- Gestion de l'état d'authentification
- Connexion avec Supabase Auth
- Inscription avec création de profil
- Déconnexion sécurisée
- Réinitialisation de mot de passe
- Écoute des changements d'état

### Utilisation
```typescript
const { user, loading, login, signup, logout } = useAuth();

// Connexion
const handleLogin = async () => {
  const { error } = await login({ email, password });
  if (error) {
    // Gérer l'erreur
  }
};

// Inscription
const handleSignup = async () => {
  const { error } = await signup({
    email,
    password,
    firstName,
    lastName,
    company,
    isFrenchTechMember
  });
};
```

## Validation des formulaires

### Schémas Zod
- **Login**: email, mot de passe, se souvenir de moi
- **Signup**: prénom, nom, email, mot de passe, confirmation, entreprise, membre French Tech, CGU

### Messages d'erreur
- Tous les messages sont en français
- Validation en temps réel
- Gestion des erreurs de serveur

## Intégration Supabase

### Configuration
- Client Supabase configuré dans `src/lib/supabase.ts`
- Authentification avec email/mot de passe
- Métadonnées utilisateur personnalisées
- Création automatique de profil

### Sécurité
- RLS (Row Level Security) activé
- Validation côté serveur
- Sessions sécurisées
- Déconnexion automatique

## Design et UX

### Charte graphique
- **Couleurs**: `french-tech-blue` (#000091), `french-tech-red` (#E1000F)
- **Typographie**: Manrope (400, 500, 700, 800), Noto Sans (400, 500, 700, 900)
- **Composants**: Cards blanches avec `shadow-sm`, boutons stylisés

### Responsive
- Design mobile-first
- Breakpoints Tailwind CSS
- Navigation adaptative
- Formulaires optimisés mobile

### Accessibilité
- Labels appropriés
- Messages d'erreur clairs
- Navigation au clavier
- ARIA labels
- Contraste suffisant

## Utilisation

### Installation des dépendances
```bash
npm install react-hook-form @hookform/resolvers zod
```

### Configuration Supabase
1. Créer un projet Supabase
2. Configurer les variables d'environnement
3. Activer l'authentification par email
4. Configurer les politiques RLS

### Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Tests

### Page de démonstration
- `/auth-demo` - Test des composants d'authentification
- `/login` - Test de la connexion
- `/signup` - Test de l'inscription

### Fonctionnalités testées
- Validation des formulaires
- États de chargement
- Gestion des erreurs
- Redirections
- Intégration Supabase

## Développement futur

### Fonctionnalités prévues
- Authentification sociale (Google, GitHub)
- Vérification email
- Authentification à deux facteurs
- Gestion des rôles utilisateur
- Audit des connexions

### Améliorations techniques
- Tests unitaires et d'intégration
- Monitoring des performances
- Logs de sécurité
- Cache des sessions
- Optimisation des requêtes

## Support

Pour toute question ou problème avec le système d'authentification, consultez :
- La documentation Supabase
- Les composants dans `src/components/auth/`
- Le hook `useAuth` dans `src/hooks/useAuth.ts`
- Les pages de démonstration dans `src/app/auth-demo/`
