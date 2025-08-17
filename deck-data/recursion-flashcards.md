# Récursion - Cartes Mémoire

## Face: Quels sont les deux éléments essentiels d'une fonction récursive ?
**Verso:** Le cas de base (condition d'arrêt) et le cas récursif (appel de la fonction à elle-même)

---

## Face: Qu'est-ce qu'un cas de base ?
**Verso:** La condition d'arrêt qui empêche l'appel infini et retourne une valeur sans récursion

---

## Face: Que se passe-t-il si on oublie le cas de base ?
**Verso:** On obtient une récursion infinie qui provoque un débordement de pile (stack overflow)

---

## Face: Qu'est-ce que la pile d'appels (call stack) ?
**Verso:** Structure de données LIFO qui stocke les appels de fonction en mémoire

---

## Face: Quelle est la différence entre récursion linéaire et arborescente ?
**Verso:** Linéaire : un seul appel récursif par exécution. Arborescente : plusieurs appels récursifs par exécution

---

## Face: Qu'est-ce que la récursion de queue (tail recursion) ?
**Verso:** Quand l'appel récursif est la dernière opération de la fonction, permettant une optimisation

---

## Face: Quel est l'ordre d'exécution dans une pile d'appels récursifs ?
**Verso:** LIFO (Last In, First Out) - le dernier appel empilé est le premier à se terminer

---

## Face: Citez trois avantages de la récursion
**Verso:** Élégance/lisibilité, simplicité pour problèmes auto-similaires, puissance pour structures complexes

---

## Face: Citez trois inconvénients de la récursion
**Verso:** Performance plus lente, risque de débordement mémoire, débogage plus difficile

---

## Face: Qu'est-ce que la mémoïsation ?
**Verso:** Technique d'optimisation qui stocke les résultats de calculs coûteux pour éviter les recalculs

---

## Face: Pour quels types de problèmes la récursion est-elle idéale ?
**Verso:** Structures hiérarchiques (arbres), division et conquête, backtracking, définitions naturellement récursives

---

## Face: Que doit faire le cas récursif pour éviter la récursion infinie ?
**Verso:** Modifier les paramètres de façon à progresser vers le cas de base

---

## Face: Quelle est la complexité temporelle de Fibonacci récursif naïf ?
**Verso:** O(2^n) - exponentielle due aux recalculs multiples

---

## Face: Comment peut-on optimiser Fibonacci récursif ?
**Verso:** Avec la mémoïsation ou en convertissant vers une version itérative

---

## Face: Qu'est-ce que la récursion mutuelle ?
**Verso:** Quand deux ou plusieurs fonctions s'appellent mutuellement de façon cyclique

---

## Face: Dans factorielle(5), combien d'appels récursifs sont effectués ?
**Verso:** 5 appels : factorielle(5), factorielle(4), factorielle(3), factorielle(2), factorielle(1)

---

## Face: Quelle est la première étape pour déboguer une fonction récursive ?
**Verso:** Vérifier que le cas de base est correct et couvre tous les scénarios d'arrêt

---

## Face: Que signifie "stack overflow" ?
**Verso:** Débordement de la pile d'appels quand trop d'appels récursifs sont empilés en mémoire

---

## Face: Comment tracer l'exécution d'une fonction récursive ?
**Verso:** Ajouter des logs avec indentation pour visualiser les appels et retours

---

## Face: Quelle structure de données est naturellement récursive ?
**Verso:** L'arbre (un arbre est soit vide, soit un nœud avec des sous-arbres)

---

## Face: Que retourne factorielle(0) et pourquoi ?
**Verso:** 1, car c'est le cas de base et mathématiquement 0! = 1

---

## Face: Comment éviter les recalculs en récursion ?
**Verso:** Utiliser la mémoïsation pour stocker et réutiliser les résultats précédents

---

## Face: Quelle est la différence entre récursion directe et indirecte ?
**Verso:** Directe : fonction s'appelle elle-même. Indirecte : fonction appelle une autre qui la rappelle

---

## Face: Que faut-il vérifier avant d'implémenter une solution récursive ?
**Verso:** Que le problème se décompose naturellement en sous-problèmes similaires plus petits

---

## Face: Comment convertir une récursion en itération ?
**Verso:** Remplacer la pile d'appels par une pile ou boucle explicite pour gérer l'état