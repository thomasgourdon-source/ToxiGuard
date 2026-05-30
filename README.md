# ToxiGuard

> **Aide décisionnelle en toxicologie d'urgence**
> Outil pédagogique gratuit pour les professionnels de santé.

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![PWA](https://img.shields.io/badge/PWA-installable%20%2B%20offline-blue)]()
[![Version](https://img.shields.io/badge/version-4.8-green)]()

---

## 👥 Auteurs

| | |
|---|---|
| **Dr Thomas Gourdon** | Médecin urgentiste — Direction médicale, conception clinique, validation des contenus |
| **Claude (Anthropic)** | Modèle d'IA — Rédaction des contenus, implémentation technique, design UX et PWA |

© 2026 — Tous droits réservés. Licence **CC BY-NC-SA 4.0** (voir [LICENSE](LICENSE)).

---

## ⚠️ Avertissement médical

ToxiGuard est un **outil pédagogique d'aide à la décision** destiné aux professionnels de santé. Il **ne remplace pas** :

- L'évaluation clinique directe d'un médecin compétent
- L'avis spécialisé d'un **Centre Antipoison (CAPTV)** — 📞 **01 40 05 48 48** (Paris, 24/7)
- Les recommandations officielles (SFMU, SRLF, ANSES, HAS, Vidal)
- Les protocoles institutionnels de votre établissement

L'utilisateur reste **seul responsable** de toute décision diagnostique ou thérapeutique.

---

## 🩺 Contenu clinique

- **54 molécules** (médicaments, drogues, gaz, champignons, venins, herbicides…)
- **7 toxidromes** avec mnémoniques pédagogiques (DUMBELS, FEVER, Triade de Hunter…)
- **24 antidotes** avec mode d'action et posologies
- **76+ interactions** dont 10 critiques + détection automatique des effets cumulés (34 catégories)
- **6 algorithmes décisionnels** visuels SVG (bradycardie, QRS large, coma + myosis, coma + hyperthermie, MUDPILES, IHF)
- **18 outils calculateurs** (Glasgow, PSS, Rumack-Matthew, Done, King's/Clichy, IVSE, RASS, équivalences opioïdes…)
- **Simulateur patient** : doses ingérées → signes attendus + timeline + cumuls
- **Mode pédiatrie** sur 15 molécules clés (seuils mg/kg, antidotes adaptés)
- **Sources scientifiques** : PubMed, EXTRIP, SFMU, SRLF, ANSES, Vidal

## ✨ Fonctionnalités techniques

- Single Page Application en **vanilla JavaScript** (zéro framework)
- **PWA installable** sur iPhone / Android / Mac / PC
- **Offline complet** une fois installée (Service Worker cache-first)
- Recherche avec **aliases commerciaux** (Doliprane, Subutex…) + tolérance aux fautes (Levenshtein)
- Recherche **inversée par signe clinique**
- **Index alphabétique** A–Z
- **Mode jour/nuit** + glassmorphism
- **Export PDF / JSON** du cas patient
- **Mode cheat sheet** pour usage flash en réa/SMUR

---

## 📁 Structure du dépôt

```
.
├── index.html              # Application complète (HTML + CSS + JS, ~330 KB)
├── manifest.webmanifest    # Métadonnées PWA (icônes, thème, raccourcis)
├── sw.js                   # Service Worker (offline cache-first)
├── vercel.json             # Configuration Vercel (headers, cache)
├── LICENSE                 # CC BY-NC-SA 4.0
├── README.md               # Ce fichier
└── .gitignore              # Fichiers à ignorer par Git
```

---

## 🚀 Déploiement sur Vercel via GitHub

### Prérequis

- Un compte **GitHub** (gratuit) : https://github.com/signup
- Un compte **Vercel** (gratuit) : https://vercel.com/signup — choisir « Continue with GitHub »

### Étape 1 — Créer le dépôt GitHub

1. Aller sur https://github.com/new
2. **Repository name** : `toxiguard` (ou ce que tu veux)
3. **Description** : `ToxiGuard — Aide décisionnelle en toxicologie d'urgence`
4. Choisir **Private** (recommandé au début pour tester) ou Public
5. **NE PAS cocher** "Add a README" / "Add .gitignore" / "Choose a license" (ils sont déjà fournis)
6. Cliquer **Create repository**

### Étape 2 — Uploader les fichiers

**Méthode simple (sans installer Git) — via interface web GitHub :**

1. Dans le dépôt fraîchement créé, cliquer sur **uploading an existing file** (le lien apparaît au milieu de la page)
2. Glisser-déposer les **6 fichiers** suivants depuis ton dossier :
   - `index.html`
   - `manifest.webmanifest`
   - `sw.js`
   - `vercel.json`
   - `LICENSE`
   - `README.md`
3. En bas, **Commit message** : `Initial commit — ToxiGuard v4.8`
4. Cliquer **Commit changes**

> 💡 **Important** : ne pas uploader `PROMPT_TOXIGUARD_COMPLET.md` ni les fichiers `index_v*_broken.html`. Le `.gitignore` les exclut.

### Étape 3 — Connecter Vercel

1. Aller sur https://vercel.com/new
2. Cliquer **Import Git Repository** → autoriser Vercel à accéder à GitHub si demandé
3. Sélectionner ton repo `toxiguard` → **Import**
4. **Framework Preset** : laisser sur **Other** (c'est du HTML statique)
5. **Root Directory** : `./` (par défaut)
6. **Build Command** : laisser vide
7. **Output Directory** : laisser vide
8. Cliquer **Deploy**

⏱ Premier déploiement : ~30 secondes.

### Étape 4 — Récupérer l'URL

Vercel te génère automatiquement une URL :
- Par défaut : `https://toxiguard-xxxx.vercel.app`
- Tu peux personnaliser dans **Settings → Domains** (ex: `toxiguard.vercel.app` si dispo)
- Tu peux aussi connecter un nom de domaine perso si tu en as un (ex: `toxiguard.fr`)

### Étape 5 — Installer la PWA

Sur l'URL générée :
- **iPhone / iPad** (Safari) : bouton **Partager** → **Sur l'écran d'accueil**
- **Android** (Chrome) : icône d'installation dans la barre d'adresse OU bouton **⬇ Installer** en bas à droite
- **Mac / PC** (Chrome/Edge) : icône d'installation dans la barre d'adresse

Une fois installée, **ToxiGuard fonctionne 100% offline** (SMUR, réa, sous-sol, ascenseur…).

### Étape 6 — Mettre à jour le site

Quand tu modifies un fichier en local :

1. Dans ton repo GitHub, cliquer sur le fichier à modifier → ✏️ **Edit**
2. Coller le nouveau contenu
3. **Commit changes** → Vercel redéploie automatiquement en ~30 sec
4. Les utilisateurs avec la PWA installée verront une **barre « Mettre à jour »** apparaître

> 💡 **Plus confortable** : installer **GitHub Desktop** ou **VS Code** avec son extension Git pour synchroniser ton dossier local et GitHub d'un clic.

---

## 🔒 Confidentialité

- **AUCUNE** donnée transmise à un serveur extérieur
- Toutes les saisies (doses, biologie, timeline) restent sur l'appareil de l'utilisateur
- Seules les préférences (thème, mode pédiatrie) sont enregistrées en `localStorage`
- Aucun cookie de tracking, aucune publicité, aucune analytique
- Conforme RGPD (pas de traitement de données à caractère personnel)

---

## 📜 Licence

**Creative Commons BY-NC-SA 4.0** (Attribution – Pas d'Utilisation Commerciale – Partage dans les Mêmes Conditions).

- ✅ Utilisation libre à des fins pédagogiques et cliniques
- ✅ Partage et adaptation autorisés
- ❌ Usage commercial interdit sans autorisation
- 🔁 Toute œuvre dérivée doit conserver la même licence et créditer les auteurs

Voir [LICENSE](LICENSE) ou https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr

---

## 💬 Retours & contributions

Toute remontée d'erreur médicale, suggestion d'amélioration ou retour d'usage en situation clinique est très bienvenue. Ouvrir une **issue** sur GitHub ou contacter directement le Dr Gourdon.

---

*Fait avec rigueur clinique 🩺 et soin technique 💻*
