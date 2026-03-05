# CitizenFeed - Micro Frontend MFE Citizens 🌃

> **Le réseau social de NeonCity** - Un micro-frontend qui reflète l'état émotionnel de la ville en temps réel.

## 📋 Description

CitizenFeed est un composant React exposé via Module Federation qui simule un fil d'actualités type Twitter pour la ville cyberpunk NeonCity. Il écoute les événements de la ville (pannes d'électricité, conditions météo, commandes hackers) et ajuste dynamiquement le contenu et la fréquence des posts.

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build de production
npm run build
```

L'application sera accessible sur **http://localhost:3007**

## 🎯 Fonctionnalités

### États Visuels
- 🟢 **Mode Normal** : Posts calmes à intervalle de 4 secondes
- 🔴 **Mode Crise** : Posts de panique accélérés (1-2 secondes), animations de crise

### Système d'Événements

**Événements Émis :**
```javascript
eventBus.emit('crowd:panic', {
  level: 87,              // Niveau de panique (0-100)
  trending: '#Blackout'   // Hashtag du moment
})
```

**Événements Écoutés :**
```javascript
// Panne d'électricité
eventBus.on('power:outage', ({ severity, cityPower }) => { ... })

// Changement météo
eventBus.on('weather:change', ({ condition, toxicity }) => { ... })

// Commande hacker
eventBus.on('hacker:command', ({ command }) => { ... })
```

### Réactions par Commande

| Événement | Effet | Panic Level | Vitesse Posts |
|-----------|-------|-------------|---------------|
| `(initial)` | Posts calmes | 5% | 4s |
| `weather:change` (storm) | Pluie toxique | 45% | 2s |
| `power:outage` (total) | Blackout complet | 87% | 1s |
| `hacker:command` = 'riot' | Chaos en ligne | 95% | 1s |
| `hacker:command` = 'love' | Messages d'amour | 10% | 3s |
| `hacker:command` = 'reset' | Retour au calme | 5% | 4s |

## 🧪 Test de l'Application

### Via l'Interface
1. Ouvrir **http://localhost:3007**
2. Ouvrir la console (F12)
3. Cliquer sur les boutons SIMULATE :
   - **WEATHER** : Tempête toxique
   - **BLACKOUT** : Coupure électrique
   - **RIOT** : Commande hacker chaos
   - **LOVE** : Commande hacker amour
   - **RESET** : Réinitialisation

### Via la Console
```javascript
// Simuler une panne d'électricité
eventBus.emit('power:outage', { severity: 'critical', cityPower: 0 })

// Simuler une tempête toxique
eventBus.emit('weather:change', { condition: 'toxic_rain', toxicity: 75 })

// Commandes hacker
eventBus.emit('hacker:command', { command: 'riot' })
eventBus.emit('hacker:command', { command: 'love' })
eventBus.emit('hacker:command', { command: 'reset' })
```

### Console Logs Attendus
```
⚡ Power Outage: { severity: 'critical', cityPower: 0 }
🚨 PANIC LEVEL: 87 | TRENDING: #Blackout
```

## 📁 Structure du Projet

```
src/
├── bootstrap.jsx           # Point d'entrée React
├── index.js               # Lazy loading du bootstrap
├── eventBus.js            # Système d'événements pub/sub
└── components/
    ├── CitizenFeed.jsx    # Composant principal
    └── CitizenFeed.css    # Styles (normal + crise)
```

## 🔧 Configuration Module Federation

```javascript
new ModuleFederationPlugin({
  name: 'mfeCitizens',
  filename: 'remoteEntry.js',
  exposes: {
    './CitizenFeed': './src/components/CitizenFeed'
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' }
  }
})
```

## 🎨 Détails Techniques

### Gestion du Panic Level
- **0-40%** : État normal (🟢), posts calmes toutes les 4s
- **41-60%** : Tempête (🟡), posts nerveux toutes les 2s
- **61-80%** : Émeute (🔴), posts chaos toutes les 1s
- **80-100%** : Blackout critique (🔴), panique maximale 1s

### Performance
- Maximum 20 posts gardés en mémoire
- Cleanup automatique des listeners (`return () => unsub()`)
- Animations CSS optimisées (60 FPS)

## 🛠️ Technologies

- **React 18.2.0** - Framework UI
- **Webpack 5** - Build & Module Federation
- **Event-Driven Architecture** - Communication inter-composants

## 📦 Scripts NPM

```bash
npm run start    # Alias pour dev
npm run dev      # Serveur développement (port 3007)
npm run build    # Build production
```

## 🌐 Ports

- **Dev Server** : `http://localhost:3007`
- **Remote Entry** : `http://localhost:3007/remoteEntry.js`

## 📝 Critères de Succès

✅ Console affiche les événements `crowd:panic` avec level & trending  
✅ Feed accélère lors d'un blackout (87% panic)  
✅ Couleurs changent dynamiquement selon le niveau de panique  
✅ Badge 🟢/🔴 s'active selon l'état de crise  
✅ Posts contextuels générés selon la situation  
✅ Cleanup des listeners correctement implémenté  

---

**NeonCity Project** - Brief Groupe 7 | Deadline: 15h00
