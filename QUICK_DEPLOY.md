# 🚀 Déploiement Rapide - French Tech Barcelona Offices

## ⚡ **Déploiement en 5 minutes avec Vercel**

### **1. Préparation (2 min)**
```bash
# Vérifiez que tout fonctionne
npm run build
npm start  # Test local en production
```

### **2. Déploiement Vercel (3 min)**
```bash
# Option A: Via CLI (recommandé)
npm run deploy:vercel

# Option B: Manuel
vercel login
vercel --prod
```

### **3. Configuration post-déploiement**
1. **Variables d'environnement** dans Vercel Dashboard
2. **Domaine personnalisé** (optionnel)
3. **Analytics** (optionnel)

---

## 🌐 **Alternative: Netlify**

```bash
npm run deploy:netlify
```

---

## 🐳 **Alternative: Docker**

```bash
npm run deploy:docker
```

---

## 📱 **Vérification rapide**

Après déploiement, testez :
- ✅ Homepage
- ✅ Navigation
- ✅ Formulaires
- ✅ Responsive design

---

## 🆘 **En cas de problème**

```bash
# Vérifiez les logs
vercel logs

# Redéployez
vercel --prod --force
```

**🎯 Votre app sera en ligne en moins de 5 minutes !**
