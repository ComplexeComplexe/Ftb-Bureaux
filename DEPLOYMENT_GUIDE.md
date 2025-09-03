# 🚀 Guide de Déploiement - French Tech Barcelona Offices

## 📋 **Prérequis**
- ✅ Projet Next.js 14 configuré et testé
- ✅ Build de production réussi
- ✅ Compte GitHub connecté
- ✅ Variables d'environnement préparées

---

## 🎯 **OPTION 1 : DÉPLOIEMENT VERCEL (Recommandé)**

### **Étape 1 : Installation de Vercel CLI**
```bash
npm install -g vercel
```

### **Étape 2 : Connexion à Vercel**
```bash
vercel login
```

### **Étape 3 : Déploiement initial**
```bash
vercel --prod
```

### **Étape 4 : Configuration des variables d'environnement**
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Settings → Environment Variables
4. Ajoutez :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`

### **Étape 5 : Déploiement automatique**
- Connectez votre repo GitHub
- Chaque push sur `main` déclenche un déploiement
- Preview automatique sur les pull requests

---

## 🌐 **OPTION 2 : DÉPLOIEMENT NETLIFY**

### **Étape 1 : Création du fichier netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Étape 2 : Déploiement via l'interface**
1. Connectez votre repo GitHub
2. Configurez les variables d'environnement
3. Déployez automatiquement

---

## ☁️ **OPTION 3 : AWS AMPLIFY**

### **Étape 1 : Configuration Amplify**
1. Connectez votre repo GitHub
2. Sélectionnez Next.js 14
3. Configurez les variables d'environnement

### **Étape 2 : Déploiement**
- Build automatique sur chaque push
- Preview sur les branches
- Production sur `main`

---

## 🐳 **OPTION 4 : DOCKER + VPS**

### **Étape 1 : Création du Dockerfile**
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### **Étape 2 : Déploiement sur VPS**
```bash
# Build de l'image
docker build -t french-tech-offices .

# Exécution
docker run -p 3000:3000 -d french-tech-offices
```

---

## 🔧 **CONFIGURATION POST-DÉPLOIEMENT**

### **1. Domaines personnalisés**
- Configurez votre domaine dans Vercel/Netlify
- Ajoutez les enregistrements DNS
- Activez HTTPS automatique

### **2. Monitoring et Analytics**
- Google Analytics 4
- Sentry pour le monitoring d'erreurs
- Vercel Analytics (si Vercel)

### **3. Performance**
- Vérifiez les scores Lighthouse
- Optimisez les images
- Configurez le cache

---

## 📊 **VÉRIFICATION POST-DÉPLOIEMENT**

### **Tests à effectuer :**
- ✅ Navigation entre toutes les pages
- ✅ Formulaires d'authentification
- ✅ Création d'offices
- ✅ Responsive design
- ✅ Performance (Lighthouse)
- ✅ HTTPS et sécurité

### **Métriques à surveiller :**
- Temps de chargement des pages
- Taux d'erreur
- Utilisation des ressources
- Performance mobile

---

## 🚨 **DÉPANNAGE COMMUN**

### **Erreur de build :**
```bash
# Vérifiez les logs
vercel logs

# Test local
npm run build
```

### **Variables d'environnement :**
- Vérifiez les noms exacts
- Redéployez après modification
- Testez en local avec `.env.local`

### **Performance :**
- Optimisez les images
- Vérifiez le bundle size
- Activez la compression

---

## 🎉 **FÉLICITATIONS !**

Votre application French Tech Barcelona Offices est maintenant en production !

**Prochaines étapes :**
1. Configurez votre domaine personnalisé
2. Ajoutez Google Analytics
3. Configurez les alertes de monitoring
4. Planifiez les mises à jour

---

## 📞 **Support**

- **Vercel** : [vercel.com/support](https://vercel.com/support)
- **Netlify** : [netlify.com/support](https://netlify.com/support)
- **Documentation** : [nextjs.org/docs](https://nextjs.org/docs)
