# Programmation Asynchrone - Cartes Mémoire

## Face: Quelle est la différence principale entre code synchrone et asynchrone ?
**Verso:** Synchrone bloque l'exécution jusqu'à completion. Asynchrone permet à d'autres opérations de continuer pendant l'attente

---

## Face: Qu'est-ce que l'Event Loop en JavaScript ?
**Verso:** Mécanisme qui gère l'exécution du code asynchrone en gérant la pile d'exécution et les queues de tâches

---

## Face: Quelle est la différence entre micro-tâches et macro-tâches ?
**Verso:** Micro-tâches (Promises) ont priorité sur macro-tâches (setTimeout). Micro-tâches s'exécutent avant les macro-tâches

---

## Face: Comment éviter le "Callback Hell" ?
**Verso:** Utiliser Promises avec chaînage `.then()` ou async/await pour une syntaxe plus lisible

---

## Face: Que signifie qu'une Promise est "pending", "fulfilled", ou "rejected" ?
**Verso:** Pending: en attente. Fulfilled: résolue avec succès. Rejected: échouée avec une erreur

---

## Face: Quelle méthode Promise utiliser pour exécuter plusieurs opérations en parallèle ?
**Verso:** `Promise.all()` pour que toutes réussissent, `Promise.allSettled()` pour récupérer tous les résultats

---

## Face: Comment gérer les erreurs avec async/await ?
**Verso:** Utiliser des blocs `try-catch-finally` autour du code `await`

---

## Face: Quelle est la différence entre Promise.all() et Promise.allSettled() ?
**Verso:** Promise.all() échoue si une Promise échoue. Promise.allSettled() retourne tous les résultats même en cas d'échec

---

## Face: Que fait Promise.race() ?
**Verso:** Retourne la première Promise qui se résout (succès ou échec), ignore les autres

---

## Face: Comment annuler une requête fetch en cours ?
**Verso:** Utiliser `AbortController` avec `signal` dans les options de fetch

---

## Face: Qu'est-ce que le Fetch API ?
**Verso:** API moderne pour faire des requêtes HTTP, remplace XMLHttpRequest, retourne des Promises

---

## Face: Comment vérifier si une réponse fetch est réussie ?
**Verso:** Vérifier `response.ok` ou `response.status`. Fetch ne rejette que pour erreurs réseau, pas codes HTTP

---

## Face: Quelle est la différence entre .then() et async/await ?
**Verso:** Même fonctionnalité, syntaxe différente. async/await plus lisible, .then() plus flexible pour chaînages complexes

---

## Face: Comment exécuter du code asynchrone de manière séquentielle vs parallèle ?
**Verso:** Séquentiel: `await` successifs. Parallèle: Promise.all() ou lancer toutes les Promises avant await

---

## Face: Qu'est-ce que le debouncing en programmation asynchrone ?
**Verso:** Technique pour retarder l'exécution d'une fonction jusqu'à ce qu'un délai s'écoule sans nouvel appel

---

## Face: Qu'est-ce que le throttling ?
**Verso:** Technique pour limiter le nombre d'exécutions d'une fonction dans un intervalle de temps donné

---

## Face: Comment gérer le timeout d'une Promise ?
**Verso:** `Promise.race()` entre la Promise et un timeout : `Promise.race([promise, timeoutPromise])`

---

## Face: Que se passe-t-il si on oublie `await` devant une fonction async ?
**Verso:** La fonction retourne une Promise non résolue au lieu de la valeur. Code continue sans attendre

---

## Face: Comment propager une erreur dans une chaîne de Promises ?
**Verso:** Ne pas avoir de `.catch()` ou re-lancer avec `throw error` dans le catch

---

## Face: Quelle différence entre setTimeout(fn, 0) et Promise.resolve().then(fn) ?
**Verso:** Promise.resolve().then() (micro-tâche) s'exécute avant setTimeout (macro-tâche)

---

## Face: Comment implémenter un retry avec backoff exponentiel ?
**Verso:** Boucle avec try-catch, doubler le délai à chaque tentative : 1s, 2s, 4s, 8s...

---

## Face: Qu'est-ce qu'un cache avec TTL ?
**Verso:** Cache qui expire automatiquement après un Time To Live défini, évite données obsolètes

---

## Face: Comment mettre à jour le DOM de manière asynchrone ?
**Verso:** Récupérer données avec fetch, puis modifier DOM avec innerHTML, appendChild, ou framework

---

## Face: Qu'est-ce que les WebSockets vs HTTP classique ?
**Verso:** WebSockets: connexion bidirectionnelle persistante. HTTP: requête/réponse ponctuelle

---

## Face: Comment gérer les erreurs réseau vs erreurs HTTP avec fetch ?
**Verso:** try-catch pour erreurs réseau. Vérifier response.ok pour erreurs HTTP (404, 500...)

---

## Face: Qu'est-ce que le lazy loading ?
**Verso:** Technique de chargement différé du contenu seulement quand nécessaire (scroll, interaction)

---

## Face: Comment éviter les appels API excessifs lors de la saisie utilisateur ?
**Verso:** Utiliser debouncing pour attendre une pause dans la saisie avant de faire l'appel

---

## Face: Quelle différence entre async function et function qui retourne Promise ?
**Verso:** async function simplifie syntaxe et gestion erreurs. Fonctionnellement équivalent à retourner Promise

---

## Face: Comment gérer l'état de chargement dans une interface asynchrone ?
**Verso:** Variables d'état (loading, error, data) + indicateurs visuels (spinners, messages)

---

## Face: Qu'est-ce que la programmation réactive ?
**Verso:** Paradigme où l'application réagit automatiquement aux changements de données asynchrones

---

## Face: Comment implémenter une sauvegarde automatique non-intrusive ?
**Verso:** Throttling sur événements input + requêtes PATCH en arrière-plan + gestion des conflits