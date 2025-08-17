# Entrées-Sorties - Cartes Mémoire

## Face: Quels sont les trois types principaux d'entrées en programmation ?
**Verso:** Entrées utilisateur (clavier, souris), fichiers (données stockées), et réseau (APIs, services web)

---

## Face: Quelle est la différence entre `alert()`, `prompt()`, et `confirm()` ?
**Verso:** `alert()` affiche un message, `prompt()` demande une saisie, `confirm()` demande une confirmation (true/false)

---

## Face: Comment récupérer la valeur d'un champ de texte HTML avec JavaScript ?
**Verso:** `document.getElementById('idChamp').value`

---

## Face: Quelle méthode utiliser pour écouter les changements dans un champ de saisie ?
**Verso:** `addEventListener('input', fonction)` pour les changements en temps réel

---

## Face: Comment empêcher la soumission automatique d'un formulaire ?
**Verso:** `event.preventDefault()` dans le gestionnaire d'événement 'submit'

---

## Face: Quelle est la différence entre `localStorage` et `sessionStorage` ?
**Verso:** `localStorage` persiste jusqu'à suppression manuelle, `sessionStorage` est supprimé à la fermeture de l'onglet

---

## Face: Comment lire un fichier texte sélectionné par l'utilisateur ?
**Verso:** Utiliser `FileReader` avec `readAsText()` sur le fichier de l'input file

---

## Face: Comment télécharger un fichier généré par JavaScript ?
**Verso:** Créer un `Blob`, générer une URL avec `URL.createObjectURL()`, créer un lien avec `download`

---

## Face: Que retourne `prompt()` si l'utilisateur annule ?
**Verso:** `null`

---

## Face: Comment convertir une chaîne de `prompt()` en nombre ?
**Verso:** `parseInt(valeur)` pour entiers ou `parseFloat(valeur)` pour décimaux

---

## Face: Quelle méthode console utiliser pour afficher un tableau d'objets ?
**Verso:** `console.table()`

---

## Face: Comment grouper des logs dans la console ?
**Verso:** `console.group('nom')` pour ouvrir, `console.groupEnd()` pour fermer

---

## Face: Que contient `process.argv` en Node.js ?
**Verso:** Un tableau avec le chemin de Node.js, le script exécuté, et tous les arguments de ligne de commande

---

## Face: Comment lire une variable d'environnement en Node.js ?
**Verso:** `process.env.NOM_VARIABLE`

---

## Face: Quelle bibliothèque Node.js utiliser pour les entrées interactives ?
**Verso:** `readline` pour créer des interfaces de saisie en ligne de commande

---

## Face: Comment lire un fichier de manière asynchrone en Node.js ?
**Verso:** `fs.readFile(chemin, encoding, callback)` ou `fs.promises.readFile()`

---

## Face: Quelle méthode HTTP utilise `fetch()` par défaut ?
**Verso:** GET

---

## Face: Comment envoyer des données JSON avec `fetch()` ?
**Verso:** Utiliser `method: 'POST'`, header `'Content-Type': 'application/json'`, et `body: JSON.stringify(data)`

---

## Face: Que signifie l'erreur "CORS" et comment la résoudre ?
**Verso:** Cross-Origin Resource Sharing - blocage de sécurité navigateur. Résolu côté serveur avec les headers appropriés

---

## Face: Comment valider une adresse email en JavaScript ?
**Verso:** Utiliser une regex comme `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

## Face: Qu'est-ce que le debouncing et pourquoi l'utiliser ?
**Verso:** Technique pour limiter l'exécution d'une fonction. Utile pour les recherches en temps réel et économiser les ressources

---

## Face: Comment échapper les caractères HTML pour éviter les failles XSS ?
**Verso:** Utiliser `textContent` au lieu d'`innerHTML` ou créer un élément div et récupérer `innerHTML`

---

## Face: Que faire si une opération d'entrée-sortie est trop lente ?
**Verso:** Implémenter un timeout avec `Promise.race()` et `setTimeout()`

---

## Face: Comment afficher une barre de progression en console ?
**Verso:** Utiliser des caractères Unicode comme `█` et `░` avec `\r` pour réécrire la ligne

---

## Face: Quelle est la différence entre `fs.readFile` et `fs.readFileSync` ?
**Verso:** `readFile` est asynchrone (non-bloquant), `readFileSync` est synchrone (bloquant)

---

## Face: Comment gérer les erreurs dans les opérations asynchrones ?
**Verso:** Utiliser `try-catch` avec `async/await` ou `.catch()` avec les Promises

---

## Face: Comment formater un nombre en devise française ?
**Verso:** `nombre.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})`

---

## Face: Quel événement écouter pour détecter la fermeture d'une interface readline ?
**Verso:** `'close'`

---

## Face: Comment ajouter du texte à la fin d'un fichier en Node.js ?
**Verso:** `fs.appendFile(chemin, contenu, callback)`

---

## Face: Quelle propriété vérifier pour savoir si une case à cocher est sélectionnée ?
**Verso:** `checked` (retourne true ou false)