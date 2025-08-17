# Boucles - Cartes Mémoire

## Face: Quels sont les quatre composants principaux d'une boucle ?
**Verso:** Initialisation, condition, itération et corps de boucle

---

## Face: Quelle est la syntaxe d'une boucle for classique ?
**Verso:** `for (initialisation; condition; incrémentation) { // corps }`

---

## Face: Quelle est la différence entre while et do...while ?
**Verso:** while vérifie la condition avant d'exécuter, do...while exécute au moins une fois puis vérifie

---

## Face: Que fait l'instruction `break` dans une boucle ?
**Verso:** Elle sort immédiatement de la boucle et passe à l'instruction suivante

---

## Face: Que fait l'instruction `continue` dans une boucle ?
**Verso:** Elle passe à l'itération suivante en sautant le reste du corps de boucle

---

## Face: Quelle boucle utiliser pour parcourir les propriétés d'un objet ?
**Verso:** `for...in`

---

## Face: Quelle boucle utiliser pour parcourir les valeurs d'un tableau ?
**Verso:** `for...of`

---

## Face: Que se passe-t-il si on oublie l'incrémentation dans une boucle while ?
**Verso:** On crée une boucle infinie qui peut planter le programme

---

## Face: Comment éviter de recalculer la longueur d'un tableau à chaque itération ?
**Verso:** Stocker la longueur dans une variable avant la boucle : `const longueur = tableau.length`

---

## Face: Que retourne la méthode `forEach()` ?
**Verso:** `undefined` - elle ne retourne rien, contrairement à `map()`

---

## Face: Quelle est la différence entre `map()` et `forEach()` ?
**Verso:** `map()` retourne un nouveau tableau transformé, `forEach()` exécute une fonction pour chaque élément sans retour

---

## Face: Que fait la méthode `filter()` ?
**Verso:** Elle crée un nouveau tableau contenant seulement les éléments qui passent le test de la fonction fournie

---

## Face: Que fait la méthode `reduce()` ?
**Verso:** Elle réduit un tableau à une seule valeur en appliquant une fonction accumulatrice

---

## Face: Comment arrêter une boucle imbriquée externe depuis la boucle interne ?
**Verso:** Utiliser des étiquettes (labels) : `break labelExtérieure;`

---

## Face: Dans `for (let i in tableau)`, que contient `i` ?
**Verso:** Les indices du tableau sous forme de chaînes de caractères ("0", "1", "2"...)

---

## Face: Dans `for (let valeur of tableau)`, que contient `valeur` ?
**Verso:** Les valeurs réelles des éléments du tableau

---

## Face: Peut-on utiliser `for...of` sur un objet simple ?
**Verso:** Non, seulement sur les objets itérables (tableaux, chaînes, Set, Map)

---

## Face: Que se passe-t-il si on modifie un tableau pendant qu'on le parcourt avec une boucle for ?
**Verso:** Comportement imprévisible - peut causer des erreurs ou manquer des éléments

---

## Face: Comment créer une boucle infinie volontairement ?
**Verso:** `while (true) { }` ou `for (;;) { }` (avec break pour sortir)

---

## Face: Quelle méthode de tableau utiliser pour trouver le premier élément qui satisfait une condition ?
**Verso:** `find()` pour l'élément ou `findIndex()` pour son index

---

## Face: Comment compter de 10 à 0 avec une boucle for ?
**Verso:** `for (let i = 10; i >= 0; i--) { }`

---

## Face: Que signifie "off-by-one error" dans les boucles ?
**Verso:** Erreur d'une unité, souvent `<=` au lieu de `<`, causant un accès hors limites

---

## Face: Comment parcourir un tableau avec index et valeur en même temps ?
**Verso:** `forEach((valeur, index) => {})` ou `for (let i = 0; i < arr.length; i++)`

---

## Face: Peut-on utiliser `break` et `continue` dans `forEach()` ?
**Verso:** Non, utiliser `return` pour simuler `continue`, pas d'équivalent pour `break`

---

## Face: Comment créer un tableau de nombres de 1 à 10 avec une boucle ?
**Verso:** `const arr = []; for (let i = 1; i <= 10; i++) arr.push(i);`

---

## Face: Quelle est l'erreur dans : `for (let i = 0; i <= arr.length; i++)` ?
**Verso:** Devrait être `i < arr.length` pour éviter l'accès à `arr[arr.length]` (undefined)

---

## Face: Comment optimiser une boucle avec des calculs coûteux ?
**Verso:** Déplacer les calculs constants hors de la boucle ou utiliser la mise en cache

---

## Face: Que fait `Array.from({length: 5}, (_, i) => i)` ?
**Verso:** Crée `[0, 1, 2, 3, 4]` - alternative fonctionnelle à une boucle for

---

## Face: Comment parcourir un objet avec ses clés et valeurs ?
**Verso:** `for (let [clé, valeur] of Object.entries(objet))` ou `Object.keys()` + `obj[clé]`

---

## Face: Quelle boucle choisir quand le nombre d'itérations est inconnu ?
**Verso:** `while` ou `do...while` selon si on veut au moins une exécution