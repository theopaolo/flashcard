# Variables - Cartes Mémoire

## Recto : Quelles sont les trois façons de déclarer une variable en JavaScript ?
**Verso :** `var`, `let`, et `const`

---

## Recto : Quelle est la différence entre déclaration et initialisation d'une variable ?
**Verso :** La déclaration crée la variable en mémoire, l'initialisation lui assigne une valeur initiale

---

## Recto : Que se passe-t-il si vous utilisez une variable `const` sans l'initialiser ?
**Verso :** SyntaxError - les variables `const` doivent être initialisées lors de la déclaration

---

## Recto : Quelle est la portée d'une variable déclarée avec `var` ?
**Verso :** Portée de fonction ou globale (si déclarée en dehors d'une fonction)

---

## Recto : Quelle est la portée d'une variable déclarée avec `let` ou `const` ?
**Verso :** Portée de bloc (limitée au bloc `{}` dans lequel elle est déclarée)

---

## Recto : Qu'est-ce que le hissage (hoisting) ?
**Verso :** Le comportement où les déclarations de variables sont déplacées vers le haut de leur portée durant la compilation

---

## Recto : Que retourne `typeof` pour une variable non déclarée ?
**Verso :** `"undefined"`

---

## Recto : Qu'est-ce que la Temporal Dead Zone ?
**Verso :** La période entre le début du scope et la déclaration où `let`/`const` ne peuvent pas être accédées

---

## Recto : Quels sont les 7 types primitifs en JavaScript ?
**Verso :** `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`

---

## Recto : Quelle est la différence entre `null` et `undefined` ?
**Verso :** `undefined` signifie non initialisé, `null` représente une absence intentionnelle de valeur

---

## Recto : Que se passe-t-il quand vous réassignez une variable `const` ?
**Verso :** TypeError - les variables `const` ne peuvent pas être réassignées

---

## Recto : Pouvez-vous modifier les propriétés d'un objet déclaré avec `const` ?
**Verso :** Oui, `const` empêche la réassignation mais pas la mutation des objets/tableaux

---

## Recto : Qu'est-ce que la coercition de type ?
**Verso :** La conversion automatique de types par JavaScript lors d'opérations

---

## Recto : Comment vérifier si une variable est un tableau ?
**Verso :** `Array.isArray(variable)` (plus fiable que `typeof`)

---

## Recto : Quelle est la différence entre passage par valeur et passage par référence ?
**Verso :** Types primitifs sont passés par valeur (copie), objets sont passés par référence

---

## Recto : Comment créer une copie profonde d'un objet ?
**Verso :** `JSON.parse(JSON.stringify(obj))` (solution simple) ou bibliothèques comme Lodash

---

## Recto : Que fait l'opérateur `...` (spread) avec les variables ?
**Verso :** Permet la décomposition/expansion d'itérables ou la création de copies superficielles

---

## Recto : Quelle est la convention de nommage recommandée en JavaScript ?
**Verso :** camelCase pour les variables et fonctions, PascalCase pour les constructeurs/classes

---

## Recto : Comment déclarer plusieurs variables en une ligne ?
**Verso :** `let a = 1, b = 2, c = 3;` ou `let a, b, c;`

---

## Recto : Que signifie qu'une variable a une portée "globale" ?
**Verso :** Elle est accessible depuis n'importe où dans le programme

---

## Recto : Comment éviter les variables globales accidentelles ?
**Verso :** Toujours utiliser `let`, `const` ou `var` lors de la déclaration, utiliser le mode strict

---

## Recto : Qu'est-ce que la destructuration de variable ?
**Verso :** Syntaxe permettant d'extraire des valeurs d'objets ou tableaux dans des variables distinctes

---

## Recto : Comment effectuer un swap de variables en JavaScript moderne ?
**Verso :** `[a, b] = [b, a]` en utilisant la destructuration

---

## Recto : Quelle est la valeur par défaut d'une variable `let` non initialisée ?
**Verso :** `undefined`

---

## Recto : Pourquoi éviter `var` en JavaScript moderne ?
**Verso :** Portée de fonction confuse, hissage complet, redéclaration autorisée - `let`/`const` sont plus prévisibles

---

## Recto : Comment rendre un objet complètement immutable ?
**Verso :** `Object.freeze(obj)` pour un niveau, ou bibliothèques comme Immutable.js pour l'immutabilité profonde

---

## Recto : Qu'est-ce qu'une variable "hoisted" ?
**Verso :** Une variable dont la déclaration est "remontée" au début de sa portée par le moteur JavaScript

---

## Recto : Quelle est la différence entre `==` et `===` pour comparer des variables ?
**Verso :** `==` effectue une coercition de type, `===` compare valeur et type sans conversion

---

## Recto : Comment déclarer une constante globale par convention ?
**Verso :** En SCREAMING_SNAKE_CASE : `const API_URL = "https://api.exemple.com";`

---

## Recto : Que se passe-t-il si vous déclarez la même variable avec `let` deux fois ?
**Verso :** SyntaxError - redéclaration non autorisée dans le même scope

---

## Recto : Comment accéder à une propriété d'objet avec un nom de variable ?
**Verso :** `obj[nomVariable]` avec la notation entre crochets

---

## Recto : Qu'est-ce que le garbage collection en relation avec les variables ?
**Verso :** Processus automatique de libération de mémoire pour les variables qui ne sont plus référencées

---

## Recto : Comment créer une variable privée dans une fonction ?
**Verso :** Déclarer avec `let`/`const` à l'intérieur de la fonction - elle ne sera accessible que dans cette portée

---

## Recto : Quelle est la différence entre `let` et `var` dans une boucle ?
**Verso :** `let` crée une nouvelle variable à chaque itération, `var` partage la même variable entre toutes les itérations

---

## Recto : Comment vérifier si une variable existe sans lever d'erreur ?
**Verso :** `typeof variable !== 'undefined'` ou utiliser `try/catch`

---

## Recto : Qu'est-ce qu'une fuite mémoire liée aux variables ?
**Verso :** Quand des variables gardent des références à des objets qui ne sont plus nécessaires, empêchant le garbage collection

---

## Recto : Comment créer un namespace pour éviter la pollution globale ?
**Verso :** Utiliser un objet ou une IIFE : `const MonApp = {}; MonApp.variable = "valeur";`

---

## Recto : Que fait `Object.seal()` par rapport à `Object.freeze()` ?
**Verso :** `seal()` empêche l'ajout/suppression de propriétés mais permet la modification, `freeze()` rend complètement immutable

---

## Recto : Comment déclarer une variable qui peut être `null` ou un objet ?
**Verso :** `let variable = null;` puis assigner un objet plus tard, ou utiliser la destructuration avec valeur par défaut

---

## Recto : Quelle est la meilleure pratique pour nommer les variables booléennes ?
**Verso :** Utiliser des préfixes comme `is`, `has`, `can`, `should` : `isActive`, `hasPermission`, `canEdit`