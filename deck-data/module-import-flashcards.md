# Modules et Imports - Cartes Mémoire

## Face: Qu'est-ce qu'un module en JavaScript ?
**Verso:** Un fichier JavaScript avec son propre scope qui peut exporter et importer des fonctionnalités

---

## Face: Comment exporter une fonction nommée ?
**Verso:** `export function myFunction() { }` ou `export { myFunction }`

---

## Face: Comment créer un export par défaut ?
**Verso:** `export default myFunction;` ou `export default class MyClass { }`

---

## Face: Comment importer un export par défaut ?
**Verso:** `import MyModule from './module.js';` (sans accolades)

---

## Face: Comment importer des exports nommés ?
**Verso:** `import { function1, function2 } from './module.js';` (avec accolades)

---

## Face: Comment importer avec un alias ?
**Verso:** `import { originalName as newName } from './module.js';`

---

## Face: Comment importer tout un module ?
**Verso:** `import * as ModuleName from './module.js';`

---

## Face: Différence entre import statique et dynamique ?
**Verso:** Statique : résolu au build time. Dynamique : `import()` retourne une Promise, résolu au runtime

---

## Face: Qu'est-ce qu'un barrel export ?
**Verso:** Fichier `index.js` qui re-exporte des modules pour simplifier les imports

---

## Face: Comment créer un barrel export ?
**Verso:** `export { default as Button } from './Button.js';` dans un fichier index.js

---

## Face: Les modules ont-ils leur propre scope ?
**Verso:** Oui, les variables d'un module ne polluent pas l'espace global

---

## Face: Peut-on avoir exports nommés ET export par défaut ?
**Verso:** Oui, un module peut avoir un export par défaut + plusieurs exports nommés

---

## Face: Comment gérer un import circulaire ?
**Verso:** Créer un module intermédiaire avec les types partagés ou refactoriser l'architecture

---

## Face: Qu'est-ce que `import.meta` ?
**Verso:** Objet contenant des métadonnées sur le module actuel (ex: `import.meta.url`)

---

## Face: Les imports doivent-ils inclure l'extension .js ?
**Verso:** Oui, en mode natif (navigateur). Parfois optionnel avec des bundlers

---

## Face: Comment faire un import conditionnel ?
**Verso:** `const module = await import('./module.js');` - import dynamique

---

## Face: Que signifie "tree shaking" ?
**Verso:** Élimination du code mort (non utilisé) possible grâce aux imports/exports statiques

---

## Face: Comment organiser les modules par fonctionnalité ?
**Verso:** Grouper par domaine métier : `auth/`, `users/`, `products/` plutôt que `js/`, `css/`

---

## Face: Qu'est-ce qu'un module wrapper ?
**Verso:** Module qui encapsule une bibliothèque externe pour fournir une interface personnalisée

---

## Face: Convention de nommage pour les fichiers modules ?
**Verso:** kebab-case pour fichiers (`user-service.js`), PascalCase pour classes (`UserService.js`)

---

## Face: Comment exporter plusieurs éléments en une fois ?
**Verso:** `export { function1, function2, CONSTANT };`

---

## Face: Comment combiner import par défaut et nommés ?
**Verso:** `import DefaultExport, { namedExport1, namedExport2 } from './module.js';`

---

## Face: Les modules sont-ils chargés de manière synchrone ?
**Verso:** Non, les modules ES6 sont chargés de manière asynchrone

---

## Face: Comment déboguer un problème d'import ?
**Verso:** Developer Tools > Network pour vérifier le chargement, Console pour erreurs

---

## Face: Peut-on re-exporter en modifiant le nom ?
**Verso:** Oui : `export { originalName as newName } from './module.js';`

---

## Face: Comment créer un point d'entrée unique pour une API ?
**Verso:** Fichier `index.js` avec `export * from './users.js';` `export * from './posts.js';`

---

## Face: Qu'est-ce que le scope d'un module ?
**Verso:** Environnement isolé où les variables ne sont pas globales et les imports/exports sont gérés

---

## Face: Comment gérer la configuration d'environnement ?
**Verso:** Module config avec conditions : `apiUrl: isProd ? 'prod-url' : 'dev-url'`

---

## Face: Avantage principal des modules ES6 ?
**Verso:** Évitent la pollution globale, dépendances explicites, optimisation possible

---

## Face: Comment tester qu'un module exporte correctement ?
**Verso:** `import * as Module from './module.js'; console.log(Object.keys(Module));`

---

## Face: Différence entre `export { }` et `export default` ?
**Verso:** `export { }` : exports nommés multiples. `export default` : un seul export principal

---

## Face: Comment partager des constantes entre modules ?
**Verso:** Module `constants/index.js` avec exports nommés, importé où nécessaire

---

## Face: Qu'est-ce qu'un module side-effect ?
**Verso:** Module importé pour son exécution (polyfills, configuration) sans importer de valeurs

---

## Face: Comment importer un module pour side-effects seulement ?
**Verso:** `import './setup.js';` (sans destructuring ni assignation)

---

## Face: Les modules supportent-ils l'héritage ?
**Verso:** Pas directement, mais on peut créer des hiérarchies via exports/imports de classes

---

## Face: Comment créer une structure de plugins modulaire ?
**Verso:** PluginManager + interface commune + chargement dynamique avec `import()`

---

## Face: Peut-on modifier un import après importation ?
**Verso:** Non, les imports sont en lecture seule (références immutables)

---

## Face: Comment gérer les dépendances entre modules ?
**Verso:** Imports explicites, éviter les circulaires, utiliser l'injection de dépendance si besoin

---

## Face: Quelle est la différence avec CommonJS ?
**Verso:** ES6 : statique, async, tree shaking. CommonJS : dynamique, sync, `require()`

---

## Face: Comment optimiser le chargement des modules ?
**Verso:** Lazy loading avec import dynamique, code splitting, bundling intelligent

---

## Face: Peut-on importer depuis une URL ?
**Verso:** Oui en mode natif : `import { func } from 'https://example.com/module.js';`