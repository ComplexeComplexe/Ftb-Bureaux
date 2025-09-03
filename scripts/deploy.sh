#!/bin/bash

# 🚀 Script de Déploiement - French Tech Barcelona Offices
# Usage: ./scripts/deploy.sh [vercel|netlify|docker]

set -e

echo "🚀 Démarrage du déploiement..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier que nous sommes dans le bon répertoire
    if [ ! -f "package.json" ]; then
        print_error "package.json non trouvé. Exécutez ce script depuis la racine du projet."
        exit 1
    fi
    
    print_success "Prérequis vérifiés"
}

# Build de production
build_project() {
    print_status "Build de production en cours..."
    
    if npm run build; then
        print_success "Build réussi !"
    else
        print_error "Build échoué"
        exit 1
    fi
}

# Déploiement Vercel
deploy_vercel() {
    print_status "Déploiement Vercel en cours..."
    
    if command -v vercel &> /dev/null; then
        print_status "Vercel CLI détecté"
        
        # Vérifier si connecté
        if vercel whoami &> /dev/null; then
            print_status "Déploiement en production..."
            vercel --prod --yes
            print_success "Déploiement Vercel réussi !"
        else
            print_warning "Vercel CLI non connecté. Exécutez 'vercel login' d'abord."
            print_status "Redirection vers la connexion..."
            vercel login
        fi
    else
        print_error "Vercel CLI non installé. Installez-le avec: npm install -g vercel"
        exit 1
    fi
}

# Déploiement Netlify
deploy_netlify() {
    print_status "Déploiement Netlify en cours..."
    
    if command -v netlify &> /dev/null; then
        print_status "Netlify CLI détecté"
        netlify deploy --prod
        print_success "Déploiement Netlify réussi !"
    else
        print_error "Netlify CLI non installé. Installez-le avec: npm install -g netlify-cli"
        exit 1
    fi
}

# Déploiement Docker
deploy_docker() {
    print_status "Déploiement Docker en cours..."
    
    if command -v docker &> /dev/null; then
        print_status "Docker détecté"
        
        # Build de l'image
        print_status "Build de l'image Docker..."
        docker build -t french-tech-offices .
        
        # Arrêt des conteneurs existants
        docker stop french-tech-offices || true
        docker rm french-tech-offices || true
        
        # Démarrage du nouveau conteneur
        print_status "Démarrage du conteneur..."
        docker run -d --name french-tech-offices -p 3000:3000 french-tech-offices
        
        print_success "Déploiement Docker réussi !"
        print_status "Application accessible sur http://localhost:3000"
    else
        print_error "Docker n'est pas installé"
        exit 1
    fi
}

# Fonction principale
main() {
    local platform=${1:-vercel}
    
    echo "🎯 Plateforme de déploiement: $platform"
    echo ""
    
    check_prerequisites
    build_project
    
    case $platform in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "docker")
            deploy_docker
            ;;
        *)
            print_error "Plateforme non reconnue: $platform"
            print_status "Plateformes supportées: vercel, netlify, docker"
            exit 1
            ;;
    esac
    
    echo ""
    print_success "🎉 Déploiement terminé avec succès !"
    
    # Afficher les informations post-déploiement
    case $platform in
        "vercel")
            echo ""
            print_status "📋 Prochaines étapes Vercel:"
            echo "   1. Configurez vos variables d'environnement"
            echo "   2. Connectez votre domaine personnalisé"
            echo "   3. Activez les analytics"
            ;;
        "netlify")
            echo ""
            print_status "📋 Prochaines étapes Netlify:"
            echo "   1. Configurez vos variables d'environnement"
            echo "   2. Connectez votre domaine personnalisé"
            echo "   3. Activez les forms et functions"
            ;;
        "docker")
            echo ""
            print_status "📋 Prochaines étapes Docker:"
            echo "   1. Configurez votre reverse proxy (nginx)"
            echo "   2. Activez HTTPS avec Let's Encrypt"
            echo "   3. Configurez le monitoring"
            ;;
    esac
}

# Exécution du script
main "$@"
