# Configuration Supabase - French Tech Barcelona Offices

## 🚀 Installation et Configuration

### 1. Installation de Supabase CLI

```bash
# Installation globale
npm install -g supabase

# Ou avec Homebrew (macOS)
brew install supabase/tap/supabase
```

### 2. Initialisation du projet Supabase

```bash
# Dans le répertoire du projet
supabase init
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration
NEXT_PUBLIC_DATABASE_URL=your_database_url

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="French Tech Barcelona Offices"
```

### 4. Démarrage de Supabase en local

```bash
# Démarrer Supabase
supabase start

# Vérifier le statut
supabase status
```

### 5. Application du schéma SQL

```bash
# Appliquer le schéma
supabase db reset

# Ou appliquer uniquement les migrations
supabase db push
```

## 🗄️ Structure de la Base de Données

### Tables principales

1. **profiles** - Profils utilisateurs
2. **offices** - Bureaux disponibles
3. **messages** - Messages entre utilisateurs
4. **bookings** - Réservations de bureaux

### Politiques RLS (Row Level Security)

- **Profiles** : Utilisateurs peuvent uniquement lire/modifier leur propre profil
- **Offices** : Lecture publique, CRUD uniquement pour le propriétaire
- **Messages** : Lecture/écriture uniquement entre l'expéditeur et le destinataire
- **Bookings** : Utilisateurs peuvent gérer leurs réservations, propriétaires peuvent voir les réservations de leurs bureaux

## 🔧 Génération des Types TypeScript

### 1. Génération automatique

```bash
# Générer les types depuis la base de données
supabase gen types typescript --local > src/lib/database.types.ts

# Ou depuis la base de production
supabase gen types typescript --project-id your-project-id > src/lib/database.types.ts
```

### 2. Utilisation des types générés

```typescript
import { Database } from '@/lib/database.types';

// Utiliser les types générés
type Profile = Database['public']['Tables']['profiles']['Row'];
type Office = Database['public']['Tables']['offices']['Row'];
```

## 🌐 Configuration de l'Authentification

### 1. Configuration des providers

Dans le fichier `supabase/config.toml`, configurez les providers d'authentification souhaités.

### 2. Redirections autorisées

```toml
[auth]
site_url = "http://localhost:3000"
additional_redirect_urls = ["https://localhost:3000"]
```

## 📊 Fonctionnalités Avancées

### 1. Realtime

Le projet inclut la configuration Realtime pour les mises à jour en temps réel des messages et réservations.

### 2. Storage

Configuration pour le stockage des images des bureaux avec une limite de 50MB par fichier.

### 3. Triggers automatiques

- Mise à jour automatique des timestamps `updated_at`
- Création automatique des profils lors de l'inscription

## 🚨 Sécurité

### 1. RLS activé sur toutes les tables
### 2. Politiques d'accès strictes
### 3. Validation des données avec contraintes CHECK
### 4. Index pour les performances

## 📝 Commandes Utiles

```bash
# Voir les logs
supabase logs

# Arrêter Supabase
supabase stop

# Redémarrer
supabase restart

# Voir le statut
supabase status

# Ouvrir Supabase Studio
supabase studio
```

## 🔗 Liens Utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase CLI](https://supabase.com/docs/reference/cli)
- [Politiques RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Authentification](https://supabase.com/docs/guides/auth)

## 🆘 Dépannage

### Problème de connexion
- Vérifiez que Supabase est démarré : `supabase status`
- Vérifiez les variables d'environnement
- Vérifiez que le port 54321 est libre

### Problème de base de données
- Réinitialisez la base : `supabase db reset`
- Vérifiez les logs : `supabase logs`

### Problème d'authentification
- Vérifiez la configuration dans `supabase/config.toml`
- Vérifiez les redirections autorisées
