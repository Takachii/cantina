# YouCode Cantine - Solution de Gestion de Restauration

Application web intuitive développée en JavaScript Vanilla avec Framework CSS __(Tailwindcss)__ pour la digitalisation de la cantine du campus YouCode. L'application permet de planifier les repas de la semaine (Lundi à Vendredi), de gérer une réserve de recettes, d'évaluer l'équilibre alimentaire et d'assurer le respect d'un budget strict.

# Context du Projet

Afin d'améliorer la vie étudiante sur le campus, cette plateforme offre au responsable de la restauration et aux apprenants un outil moderne et dynamique pour concevoir et consulter le menu de la semaine.

---
# Fonctionnalités Principales

## 1. Gestion de la Réserve de Recettes (Garde-Manger)

Ajout de recettes : Formulaire modal interactif avec validation en temps réel (Regex) pour saisir :

Nom du plat (3 à 30 caractères)

Catégorie (Entrée, Plat principal, Dessert)

Prix (nombre positif)

Badge qualitatif (Bio, Végétarien, Classique)

Modification & Suppression :

Seuls les plats actuellement situés dans la réserve peuvent être modifiés. Les plats assignés doivent être retirés du planning au préalable.

Boîte de dialogue de confirmation avant toute suppression.

Recherche et Filtrage (Bonus) : Recherche par nom et filtrage par catégorie.

## 2. Planning de la Semaine & Attribution

Planification Hebdomadaire : Attribution des plats par jour (Lundi au Vendredi) à l'aide de sélecteurs ou par Glisser-Déposer / Drag & Drop (Bonus).

Contrôle de Répartition Culinaires : Une entrée ne peut être placée que dans un créneau Entrée, un plat dans un créneau Plat, etc.

Gestion des États : Lorsqu'un plat est assigné, sa carte en réserve devient semi-transparente et affiche son affectation ([Assigné : Mardi - Plat]). En cas de désassociation ("En réserve"), la carte réintègre le stock normal.

## 3. Suivi Budgétaire & Statistiques

Plafond Budgétaire Strict : Coût maximal de 50 DH par jour et par apprenant. Tout dépassement bloque l'action et signale une erreur.

Calculs en Temps Réel :

Progression de la planification (ex. 3/5 jours prêts).

Coût quotidien et coût total de la semaine.

Badge d'Équilibre Alimentaire (détection automatique d'au moins 1 plat Végétarien sur la semaine).

## 4. Ergonomie & Interface Utilisateur

Notifications Toast : Messages de confirmation/erreur interactifs avec bouton de fermeture.

Mode Sombre / Mode Clair (Bonus) : Basculement dynamique du thème UI.

Vues Multiples (Bonus) : Commutation entre la Vue Cartes et la Vue Tableau imprimable.

Complétion Automatique (Bonus) : Remplissage intelligent des créneaux vides en fonction de la réserve et du respect du budget ("Compléter la semaine").

Mise en valeur visuelle (Bonus) : Clic sur un plat du menu pour faire clignoter la carte correspondante dans la réserve.

Sauvegarde Locale (Bonus) : Persistance des données via localStorage.

# Stack Technique

HTML5 : Structure sémantique et accessibilité.

CSS3 : Flexbox/Grid, thèmes clair/sombre et animations.

JavaScript Vanilla (ES6+) : Manipulation du DOM, gestion d'événements dynamique (Event Delegation), propagation d'événements (stopPropagation), stockage local (localStorage).