# Structures de Données - Cartes Mémoire

## Face: Quels sont les types de données primitifs en JavaScript ?
**Verso:** Number, String, Boolean, null, undefined, Symbol (ES6), BigInt (ES2020)

---

## Face: Quelle est la différence entre un Array et un Set ?
**Verso:** Array peut contenir des doublons et est indexé, Set ne contient que des valeurs uniques sans index

---

## Face: Comment ajouter un élément à la fin d'un tableau ?
**Verso:** `array.push(element)` - retourne la nouvelle longueur

---

## Face: Comment supprimer et retourner le dernier élément d'un tableau ?
**Verso:** `array.pop()` - retourne l'élément supprimé

---

## Face: Quelle est la différence entre `map()` et `forEach()` ?
**Verso:** `map()` retourne un nouveau tableau transformé, `forEach()` n'a pas de valeur de retour

---

## Face: Comment fusionner deux tableaux ?
**Verso:** `array1.concat(array2)` ou `[...array1, ...array2]` (spread operator)

---

## Face: Comment vérifier si une propriété existe dans un objet ?
**Verso:** `'propriete' in objet` ou `objet.hasOwnProperty('propriete')`

---

## Face: Quelle méthode utiliser pour obtenir toutes les clés d'un objet ?
**Verso:** `Object.keys(objet)`

---

## Face: Comment créer une copie superficielle d'un objet ?
**Verso:** `Object.assign({}, objet)` ou `{...objet}` (spread operator)

---

## Face: Quelle est la différence entre Map et Object pour stocker des paires clé-valeur ?
**Verso:** Map peut utiliser n'importe quel type comme clé, Object utilise seulement des chaînes/symboles comme clés

---

## Face: Comment supprimer les doublons d'un tableau ?
**Verso:** `[...new Set(array)]`

---

## Face: Quelle méthode permet de transformer un tableau en une seule valeur ?
**Verso:** `array.reduce()`

---

## Face: Comment vérifier si une variable est un tableau ?
**Verso:** `Array.isArray(variable)`

---

## Face: Quelle est la complexité temporelle de l'accès à un élément par index dans un tableau ?
**Verso:** O(1) - temps constant

---

## Face: Comment trier un tableau de nombres en ordre croissant ?
**Verso:** `array.sort((a, b) => a - b)`

---

## Face: Quelle méthode trouve le premier élément qui satisfait une condition ?
**Verso:** `array.find(callback)`

---

## Face: Comment convertir une chaîne en tableau de caractères ?
**Verso:** `string.split('')` ou `[...string]`

---

## Face: Quelle est la différence entre `slice()` et `splice()` ?
**Verso:** `slice()` extrait sans modifier l'original, `splice()` modifie le tableau original

---

## Face: Comment itérer sur les propriétés d'un objet ?
**Verso:** `for...in` ou `Object.keys(obj).forEach()` ou `Object.entries(obj)`

---

## Face: Qu'est-ce qu'une structure de données LIFO ?
**Verso:** Last In, First Out - comme une pile (stack)

---

## Face: Qu'est-ce qu'une structure de données FIFO ?
**Verso:** First In, First Out - comme une file (queue)

---

## Face: Comment ajouter un élément au début d'un tableau ?
**Verso:** `array.unshift(element)`

---

## Face: Quelle méthode convertit un objet en chaîne JSON ?
**Verso:** `JSON.stringify(objet)`

---

## Face: Comment créer un objet à partir d'un tableau d'entrées [clé, valeur] ?
**Verso:** `Object.fromEntries(array)`

---

## Face: Quelle est la différence entre WeakMap et Map ?
**Verso:** WeakMap a des clés faiblement référencées (garbage collection automatique) et ne peut avoir que des objets comme clés

---

## Face: Comment vérifier si un Set contient une valeur ?
**Verso:** `set.has(valeur)`

---

## Face: Quelle méthode joint tous les éléments d'un tableau en une chaîne ?
**Verso:** `array.join(separateur)`

---

## Face: Comment obtenir la longueur d'une chaîne de caractères ?
**Verso:** `string.length` (propriété, pas méthode)

---

## Face: Comment extraire une partie d'une chaîne ?
**Verso:** `string.substring(start, end)` ou `string.slice(start, end)`

---

## Face: Quelle méthode retourne un nouveau tableau avec tous les éléments qui passent un test ?
**Verso:** `array.filter(callback)`

---

## Face: Comment inverser l'ordre des éléments dans un tableau ?
**Verso:** `array.reverse()` - modifie le tableau original