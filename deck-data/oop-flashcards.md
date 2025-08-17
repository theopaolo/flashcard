# Programmation Orientée Objet - Cartes Mémoire

## Face: Qu'est-ce qu'une classe en programmation ?
**Verso:** Un modèle ou plan pour créer des objets qui définit les propriétés et méthodes que les objets auront

---

## Face: Quel est le rôle du constructeur dans une classe ?
**Verso:** Méthode spéciale qui s'exécute automatiquement lors de la création d'un objet pour initialiser ses propriétés

---

## Face: Comment déclarer une propriété privée en JavaScript moderne ?
**Verso:** Avec le préfixe `#` : `#maProprietePrivee`

---

## Face: Quelle est la différence entre `this` dans une méthode normale et une arrow function ?
**Verso:** Méthode normale : `this` dépend du contexte d'appel. Arrow function : `this` est lié lexicalement (contexte de définition)

---

## Face: Que fait le mot-clé `super` ?
**Verso:** Permet d'appeler le constructeur ou les méthodes de la classe parent dans une classe enfant

---

## Face: Différence entre méthode d'instance et méthode statique ?
**Verso:** Instance : appartient aux objets créés. Statique : appartient à la classe elle-même (appelée avec ClassName.method())

---

## Face: Comment éviter la perte du contexte `this` ?
**Verso:** 3 solutions : `bind()`, arrow functions, ou stocker `this` dans une variable (const self = this)

---

## Face: Qu'est-ce que l'encapsulation ?
**Verso:** Principe qui consiste à cacher les détails internes d'un objet et contrôler l'accès aux données via des méthodes

---

## Face: Comment implémenter le chaînage de méthodes ?
**Verso:** Faire retourner `this` à la fin de chaque méthode : `return this;`

---

## Face: Qu'est-ce que l'héritage en POO ?
**Verso:** Mécanisme permettant à une classe d'hériter des propriétés et méthodes d'une autre classe avec `extends`

---

## Face: Différence entre héritage et composition ?
**Verso:** Héritage : "est-un" (extends). Composition : "a-un" (contient des instances d'autres classes)

---

## Face: Comment créer un getter en JavaScript ?
**Verso:** `get nomPropriete() { return this._valeur; }` - permet d'accéder comme une propriété

---

## Face: Comment créer un setter avec validation ?
**Verso:** `set nomPropriete(valeur) { if (valeur > 0) this._valeur = valeur; }`

---

## Face: Qu'est-ce qu'une méthode abstraite ?
**Verso:** Méthode définie dans une classe parent mais devant être implémentée par les classes enfants

---

## Face: Comment simuler une classe abstraite en JavaScript ?
**Verso:** Lancer une erreur dans le constructeur ou les méthodes : `throw new Error("Classe abstraite")`

---

## Face: Qu'est-ce que le pattern Singleton ?
**Verso:** Pattern qui garantit qu'une classe n'a qu'une seule instance et fournit un point d'accès global

---

## Face: Comment implémenter un Singleton ?
**Verso:** Instance statique privée + méthode statique getInstance() qui retourne toujours la même instance

---

## Face: Qu'est-ce que le pattern Factory ?
**Verso:** Pattern qui crée des objets sans spécifier leur classe exacte, basé sur des paramètres ou conditions

---

## Face: Avantage principal de l'encapsulation ?
**Verso:** Contrôle de l'accès aux données, validation des valeurs, et interface stable pour les utilisateurs

---

## Face: Que signifie "overrider" une méthode ?
**Verso:** Redéfinir une méthode héritée dans une classe enfant pour changer son comportement

---

## Face: Comment appeler une méthode parent dans une méthode overridée ?
**Verso:** Utiliser `super.nomMethode()` pour appeler la version parent de la méthode

---

## Face: Qu'est-ce qu'un mixin en JavaScript ?
**Verso:** Technique pour partager des fonctionnalités entre classes sans héritage direct

---

## Face: Convention de nommage pour les classes ?
**Verso:** PascalCase : `MaClasse`, `UtilisateurPremium`

---

## Face: Convention de nommage pour les méthodes et propriétés ?
**Verso:** camelCase : `maMethode`, `nomUtilisateur`

---

## Face: Comment vérifier le type d'un objet ?
**Verso:** `instanceof` : `obj instanceof MaClasse` retourne true/false

---

## Face: Différence entre `==` et `===` pour comparer des objets ?
**Verso:** Les deux comparent les références (même objet en mémoire). Pour le contenu, utiliser une méthode personnalisée

---

## Face: Qu'est-ce qu'un constructeur par défaut ?
**Verso:** Si aucun constructeur n'est défini, JavaScript fournit un constructeur vide automatiquement

---

## Face: Peut-on avoir plusieurs constructeurs en JavaScript ?
**Verso:** Non, une seule méthode constructor par classe. Utiliser des méthodes statiques pour créer différemment

---

## Face: Comment créer une propriété en lecture seule ?
**Verso:** Getter sans setter : `get valeur() { return this._valeur; }` (pas de set correspondant)

---

## Face: Qu'est-ce que la composition d'objets ?
**Verso:** Construire des objets complexes en combinant des objets plus simples plutôt qu'en héritant

---

## Face: Avantage de la composition sur l'héritage ?
**Verso:** Plus flexible, évite les hiérarchies complexes, permet de combiner plusieurs comportements

---

## Face: Comment déboguer un problème de `this` ?
**Verso:** console.log(this) dans la méthode, vérifier le contexte d'appel, ou utiliser bind/arrow functions

---

## Face: Qu'est-ce qu'une méthode fluent interface ?
**Verso:** Méthodes qui retournent `this` pour permettre le chaînage : `obj.method1().method2().method3()`

---

## Face: Comment créer une méthode statique ?
**Verso:** Préfixer avec `static` : `static maMethode() { ... }` - appelée avec `Classe.maMethode()`

---

## Face: Les propriétés statiques sont-elles partagées ?
**Verso:** Oui, entre toutes les instances de la classe - utile pour compteurs ou configuration globale

---

## Face: Comment gérer l'héritage de propriétés statiques ?
**Verso:** Les propriétés statiques sont héritées par les classes enfants et peuvent être overridées

---

## Face: Qu'est-ce que l'instantiation ?
**Verso:** Processus de création d'un objet à partir d'une classe avec l'opérateur `new`

---

## Face: Différence entre `Object.create()` et `new Class()` ?
**Verso:** `Object.create()` crée avec prototype spécifique. `new` utilise le prototype du constructeur + appelle constructor

---

## Face: Comment créer une copie d'un objet ?
**Verso:** Shallow copy : `{...obj}` ou `Object.assign()`. Deep copy : `JSON.parse(JSON.stringify())` ou librairie

---

## Face: Qu'est-ce que le polymorphisme ?
**Verso:** Capacité d'objets de différentes classes à répondre à la même interface de manière différente

---

## Face: Comment implémenter le polymorphisme en JavaScript ?
**Verso:** Héritage avec override de méthodes : chaque classe enfant implémente différemment la même méthode

---

## Face: Qu'est-ce qu'une interface en POO ?
**Verso:** Contrat définissant quelles méthodes une classe doit implémenter (simulé en JS par conventions)

---

## Face: Comment simuler des interfaces en JavaScript ?
**Verso:** Documentation, conventions de nommage, ou utiliser TypeScript pour un typage strict

---

## Face: Qu'est-ce que la surcharge de méthodes ?
**Verso:** Avoir plusieurs méthodes avec le même nom mais différents paramètres (non supporté nativement en JS)

---

## Face: Comment simuler la surcharge en JavaScript ?
**Verso:** Vérifier le nombre/type des arguments dans une seule méthode avec `arguments` ou paramètres par défaut

---

## Face: Avantages principaux de la POO ?
**Verso:** Réutilisabilité, maintenabilité, modularité, encapsulation, et modélisation naturelle des concepts métier