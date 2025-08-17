# Gestion d'Erreurs - Cartes Mémoire

## Face: Quels sont les trois blocs principaux de gestion d'erreurs en JavaScript ?
**Verso:** `try`, `catch`, et `finally`

---

## Face: Quelle est la différence entre TypeError et ReferenceError ?
**Verso:** TypeError: opération sur un type incompatible. ReferenceError: variable non déclarée ou hors de portée

---

## Face: Dans quel ordre s'exécutent try, catch et finally ?
**Verso:** `try` d'abord, `catch` si erreur, `finally` toujours en dernier même si return/throw

---

## Face: Comment créer une erreur personnalisée en JavaScript ?
**Verso:** Étendre la classe Error: `class MonErreur extends Error { constructor(message) { super(message); this.name = 'MonErreur'; } }`

---

## Face: Que fait l'instruction `throw` ?
**Verso:** Lance une exception qui peut être capturée par un bloc `catch`

---

## Face: Comment gérer les erreurs dans une fonction async/await ?
**Verso:** Utiliser `try-catch` autour du code `await`

---

## Face: Que se passe-t-il si une Promise est rejetée et n'a pas de `.catch()` ?
**Verso:** UnhandledPromiseRejection - erreur non gérée qui peut planter l'application

---

## Face: Quelle méthode Promise utiliser pour gérer plusieurs promesses même si certaines échouent ?
**Verso:** `Promise.allSettled()` - retourne toutes les résultats (fulfilled ou rejected)

---

## Face: Qu'est-ce que le pattern "Fail Fast" ?
**Verso:** Échouer rapidement en validant les entrées au début et en lançant des erreurs immédiatement

---

## Face: Comment propager une erreur dans une chaîne de Promises ?
**Verso:** Ne pas avoir de `.catch()` ou re-lancer l'erreur avec `throw error` dans le catch

---

## Face: Quelle est la différence entre Error et Exception ?
**Verso:** En JavaScript, on utilise principalement "Error". Exception est un terme plus général pour les erreurs d'exécution

---

## Face: Comment vérifier le type d'une erreur capturée ?
**Verso:** `error instanceof MonTypeErreur` ou vérifier `error.name` ou `error.constructor.name`

---

## Face: Que signifie "graceful degradation" en gestion d'erreurs ?
**Verso:** Continuer de fonctionner avec des fonctionnalités réduites plutôt que de planter complètement

---

## Face: Qu'est-ce qu'un Circuit Breaker ?
**Verso:** Pattern qui ouvre le circuit après plusieurs échecs consécutifs pour éviter les appels inutiles

---

## Face: Comment implémenter un retry avec backoff exponentiel ?
**Verso:** Doubler le délai d'attente à chaque tentative: 1s, 2s, 4s, 8s, etc.

---

## Face: Quelle information devrait toujours être loggée lors d'une erreur ?
**Verso:** Timestamp, message d'erreur, stack trace, contexte/paramètres, ID de l'utilisateur/session

---

## Face: Comment gérer les erreurs dans Promise.all() ?
**Verso:** Si une Promise échoue, toutes échouent. Utiliser try-catch ou .catch() sur Promise.all()

---

## Face: Qu'est-ce que le Result Pattern ?
**Verso:** Encapsuler le succès/échec dans un objet au lieu d'utiliser des exceptions

---

## Face: Comment éviter les try-catch imbriqués (pyramid of doom) ?
**Verso:** Early return, async/await, Promise chaining, ou patterns comme Result/Maybe

---

## Face: Quelle est la différence entre console.error() et throw new Error() ?
**Verso:** console.error() affiche seulement, throw new Error() lance une exception qui doit être gérée

---

## Face: Comment créer un logger structuré ?
**Verso:** Créer des objets JSON avec timestamp, niveau, message, contexte au lieu de texte simple

---

## Face: Qu'est-ce qu'une erreur "retryable" vs "non-retryable" ?
**Verso:** Retryable: temporaire (timeout, 500). Non-retryable: permanente (404, validation)

---

## Face: Comment gérer les erreurs dans les Event Listeners ?
**Verso:** Wrapper chaque handler dans try-catch ou utiliser window.addEventListener('error')

---

## Face: Que fait `Error.captureStackTrace()` ?
**Verso:** Méthode Node.js pour personnaliser la stack trace d'une erreur

---

## Face: Comment implémenter un timeout sur une Promise ?
**Verso:** `Promise.race([promise, new Promise((_, reject) => setTimeout(reject, timeout))])`

---

## Face: Quelle est la différence entre synchrone et asynchrone pour la gestion d'erreurs ?
**Verso:** Synchrone: try-catch direct. Asynchrone: .catch() sur Promises ou try-catch avec await

---

## Face: Comment centraliser la gestion d'erreurs dans une application ?
**Verso:** Error boundary, middleware d'erreur, gestionnaire global, ou service de logging centralisé

---

## Face: Qu'est-ce qu'un "error boundary" ?
**Verso:** Composant/système qui capture les erreurs de ses enfants pour éviter le crash de l'application

---

## Face: Comment déboguer une erreur sans stack trace ?
**Verso:** Ajouter des points de log, utiliser le débogueur, reproduire avec des données de test

---

## Face: Quelle est la différence entre 4xx et 5xx en codes d'erreur HTTP ?
**Verso:** 4xx: erreur client (requête invalide). 5xx: erreur serveur (problème interne)