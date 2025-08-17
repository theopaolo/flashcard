# Fonctions - Cartes Mémoire

## Recto : Quels sont les quatre composants principaux d'une fonction ?
**Verso :** Nom de la fonction, paramètres, corps de la fonction, et instruction de retour

---

## Recto : Quelle est la différence entre paramètres et arguments ?
**Verso :** Les paramètres sont des espaces réservés dans la définition de la fonction ; les arguments sont les valeurs réelles passées lors de l'appel de la fonction

---

## Recto : Que retourne une fonction si aucune instruction de retour n'est spécifiée ?
**Verso :** `undefined`

---

## Recto : Quelle est la syntaxe pour une déclaration de fonction ?
**Verso :** `function nomDeLaFonction(parametres) { // corps }`

---

## Recto : Quelle est la syntaxe pour une fonction fléchée ?
**Verso :** `const nomDeLaFonction = (parametres) => { // corps }` ou `const nomDeLaFonction = param => expression`

---

## Recto : Qu'est-ce qu'une fonction d'ordre supérieur ?
**Verso :** Une fonction qui prend d'autres fonctions comme paramètres ou retourne une fonction

---

## Recto : Qu'est-ce que le hissage de fonction ?
**Verso :** Le comportement où les déclarations de fonction sont déplacées vers le haut de leur portée durant la compilation

---

## Recto : Qu'est-ce qu'une fermeture ?
**Verso :** Une fonction qui a accès aux variables de sa portée externe (englobante) même après que la fonction externe ait fini de s'exécuter

---

## Recto : Quelle est la différence entre `let`, `var`, et `const` à l'intérieur des fonctions ?
**Verso :** `let` et `const` ont une portée de bloc, `var` a une portée de fonction. `const` ne peut pas être réassigné

---

## Recto : Que fait la méthode `map()` ?
**Verso :** Crée un nouveau tableau en transformant chaque élément du tableau original à l'aide d'une fonction fournie

---

## Recto : Que fait la méthode `filter()` ?
**Verso :** Crée un nouveau tableau contenant uniquement les éléments qui passent un test implémenté par la fonction fournie

---

## Recto : Que fait la méthode `reduce()` ?
**Verso :** Exécute une fonction réductrice sur chaque élément du tableau, résultant en une seule valeur de sortie

---

## Recto : Qu'est-ce qu'une fonction pure ?
**Verso :** Une fonction qui retourne toujours la même sortie pour la même entrée et n'a pas d'effets de bord

---

## Recto : Qu'est-ce qu'une IIFE ?
**Verso :** Expression de Fonction Immédiatement Invoquée - une fonction qui s'exécute dès qu'elle est définie

---

## Recto : Comment définir des paramètres par défaut dans une fonction ?
**Verso :** `function maFonction(param = valeurParDefaut) { }`

---

## Recto : Qu'est-ce que les paramètres rest ?
**Verso :** Permettent à une fonction d'accepter un nombre indéfini d'arguments comme un tableau, en utilisant la syntaxe `...nomParam`

---

## Recto : Quelle est la différence entre le hissage des déclarations de fonction et des expressions de fonction ?
**Verso :** Les déclarations de fonction sont entièrement hissées (peuvent être appelées avant la définition), les expressions de fonction ne sont pas hissées

---

## Recto : Qu'est-ce qu'une fonction callback ?
**Verso :** Une fonction passée comme argument à une autre fonction pour être exécutée plus tard

---

## Recto : Comment accéder à tous les arguments dans une fonction (pré-ES6) ?
**Verso :** En utilisant l'objet `arguments` (non disponible dans les fonctions fléchées)

---

## Recto : Quel est le contexte `this` dans les fonctions fléchées vs les fonctions régulières ?
**Verso :** Les fonctions fléchées héritent du `this` de la portée englobante ; les fonctions régulières ont leur propre contexte `this`

---

## Recto : Qu'est-ce qu'une fonction usine ?
**Verso :** Une fonction qui retourne de nouveaux objets, servant d'alternative aux fonctions constructeurs ou aux classes

---

## Recto : Que se passe-t-il quand vous appelez une fonction avec moins d'arguments que de paramètres ?
**Verso :** Les paramètres manquants sont définis à `undefined`

---

## Recto : Que se passe-t-il quand vous appelez une fonction avec plus d'arguments que de paramètres ?
**Verso :** Les arguments supplémentaires sont ignorés (mais accessibles via l'objet `arguments` dans les fonctions régulières)

---

## Recto : Comment créer une fonction qui retourne une autre fonction ?
**Verso :** `function externe() { return function interne() { // code }; }`

---

## Recto : Quelle est la différence entre `forEach()` et `map()` ?
**Verso :** `forEach()` exécute une fonction pour chaque élément du tableau (pas de retour), `map()` crée un nouveau tableau avec des éléments transformés

---

## Recto : Comment déstructurer les paramètres dans une fonction ?
**Verso :** `function maFonction({prop1, prop2}) { }` pour les objets ou `function maFonction([item1, item2]) { }` pour les tableaux

---

## Recto : Qu'est-ce que la portée de fonction ?
**Verso :** L'accessibilité des variables à l'intérieur d'une fonction - les variables déclarées à l'intérieur ne sont pas accessibles à l'extérieur

---

## Recto : Qu'est-ce que le motif module dans les fonctions ?
**Verso :** Utiliser une IIFE pour créer des variables privées et exposer uniquement des méthodes publiques, créant l'encapsulation

---

## Recto : Qu'est-ce que la mémorisation dans le contexte des fonctions ?
**Verso :** Mise en cache des résultats de fonction pour éviter des recalculs coûteux pour les mêmes entrées

---

## Recto : Comment gérer les erreurs dans les fonctions ?
**Verso :** En utilisant des blocs try-catch, en lançant des erreurs avec `throw`, ou en retournant des objets/valeurs d'erreur