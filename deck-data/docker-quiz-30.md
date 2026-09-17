# Docker — Quiz architecture web

30 questions progressives sur Docker, Docker Compose, réseaux, volumes, multi-stage, registry, staging, production et architecture web.

## 1. Quelle proposition décrit le mieux la relation entre une image Docker et un conteneur ?

**Niveau :** Introduction  
**Thèmes :** image, container

- **A.** Une image est créée à partir d’un conteneur à chaque démarrage.
- **B.** Une image est un modèle immuable à partir duquel Docker crée des conteneurs.
- **C.** Une image est uniquement une sauvegarde des données persistantes d’un conteneur.
- **D.** Une image et un conteneur sont deux noms pour le même objet Docker.

**Indice :** Demande-toi ce qui existe avant le démarrage et ce que Docker crée lors du lancement.

**Réponse :** B

**Explication :** Une image est un artefact immuable. Un conteneur est une instance créée à partir de cette image et possède sa propre couche writable.

---

## 2. Dans un projet Compose contenant les services `api` et `db`, l’API doit joindre PostgreSQL sur son port interne 5432. Quel hostname doit-elle utiliser ?

**Niveau :** Introduction  
**Thèmes :** compose, network, dns

- **A.** `localhost:5432`
- **B.** `db:5432`
- **C.** `127.0.0.1:5432`
- **D.** `postgres.internal:5432`

**Indice :** Compose transforme automatiquement quelque chose que tu écris déjà sous `services:` en nom DNS.

**Réponse :** B

**Explication :** Sur le réseau Compose par défaut, chaque service est joignable par son nom de service.

---

## 3. Un service Compose contient `ports: ["8080:3000"]`. Que signifie ce mapping ?

**Niveau :** Introduction  
**Thèmes :** ports, network

- **A.** Le conteneur écoute sur 8080 et l’hôte sur 3000.
- **B.** L’hôte utilise `localhost:8080` pour atteindre le port 3000 du conteneur.
- **C.** Les autres conteneurs doivent utiliser le port 8080 pour parler à ce service.
- **D.** Docker modifie automatiquement le port d’écoute de l’application de 3000 vers 8080.

**Indice :** Lis la syntaxe comme `machine hôte : conteneur`.

**Réponse :** B

**Explication :** Le port de gauche est publié sur l’hôte, celui de droite correspond au port interne du conteneur.

---

## 4. Une base PostgreSQL utilise `db_data:/var/lib/postgresql/data`. Quel est le rôle principal de `db_data` ?

**Niveau :** Introduction  
**Thèmes :** volume, persistence

- **A.** Permettre au navigateur d’accéder aux fichiers PostgreSQL.
- **B.** Conserver les données PostgreSQL indépendamment du cycle de vie du conteneur.
- **C.** Copier automatiquement la base dans Git.
- **D.** Modifier de façon permanente l’image `postgres`.

**Indice :** Imagine que le conteneur PostgreSQL est supprimé puis recréé.

**Réponse :** B

**Explication :** Le volume nommé externalise les données importantes hors de la couche writable du conteneur.

---

## 5. Quel montage est le plus adapté pour que les modifications de `./src` sur ta machine apparaissent immédiatement dans `/app/src` du conteneur ?

**Niveau :** Introduction  
**Thèmes :** bind-mount, dev

- **A.** `./src:/app/src`
- **B.** `db_data:/app/src`
- **C.** `EXPOSE /app/src`
- **D.** Un `healthcheck` sur `/app/src`.

**Indice :** Cherche le mécanisme qui relie directement un chemin de ta machine à un chemin du conteneur.

**Réponse :** A

**Explication :** Les bind mounts sont particulièrement utiles en développement pour le hot reload et l’édition depuis l’hôte.

---

## 6. Une API doit démarrer uniquement lorsque PostgreSQL accepte réellement les connexions. Quelle solution est la plus adaptée ?

**Niveau :** Introduction  
**Thèmes :** compose, healthcheck, depends_on

- **A.** `depends_on` avec `service_started` uniquement.
- **B.** Un `healthcheck` PostgreSQL et `depends_on` avec `service_healthy`.
- **C.** Publier le port 5432 sur l’hôte.
- **D.** Créer un volume pour PostgreSQL.

**Indice :** Distingue « le processus est lancé » de « le service est opérationnel ».

**Réponse :** B

**Explication :** Le healthcheck teste l’état réel du service ; `service_healthy` permet d’attendre ce résultat.

---

## 7. Quel `depends_on` convient à une API qui doit démarrer uniquement après la réussite d’un service de migration ponctuel ?

**Niveau :** Introduction  
**Thèmes :** compose, migrations

- **A.** `service_started`
- **B.** `service_healthy`
- **C.** `service_completed_successfully`
- **D.** Aucune condition n’est nécessaire.

**Indice :** Le service de migration est un job qui doit finir, pas un serveur qui doit rester vivant.

**Réponse :** C

**Explication :** `service_completed_successfully` est adapté aux migrations, setups et tâches ponctuelles.

---

## 8. Quelle pratique est la plus adaptée pour un secret d’authentification utilisé uniquement en développement local ?

**Niveau :** Introduction  
**Thèmes :** env, secrets

- **A.** Le committer directement dans `compose.yaml`.
- **B.** Le placer dans un `.env` ignoré par Git puis l’injecter via Compose.
- **C.** Le copier dans l’image avec `COPY`.
- **D.** Le mettre dans le tag de l’image Docker.

**Indice :** Cherche une solution simple qui garde le secret hors de Git.

**Réponse :** B

**Explication :** En développement, un `.env` gitignored est souvent suffisant ; en production, on préfère une injection par l’infrastructure ou un secret manager.

---

## 9. Dans un Dockerfile multi-stage, quel usage correspond le mieux à `dev`, `builder` et `production` ?

**Niveau :** Introduction  
**Thèmes :** dockerfile, multistage

- **A.** `dev` pour le hot reload, `builder` pour construire les artefacts, `production` pour le runtime final.
- **B.** `builder` pour la production, `production` pour les tests, `dev` pour le staging.
- **C.** Chaque stage doit obligatoirement être déployé sur un serveur différent.
- **D.** Le multi-stage sert uniquement à faire plusieurs copies du même conteneur.

**Indice :** Pense à ce qui est nécessaire pour développer, construire, puis exécuter.

**Réponse :** A

**Explication :** Le multi-stage permet notamment de garder les compilateurs et devDependencies hors de l’image finale.

---

## 10. Quelle stratégie respecte le mieux le principe `build once, deploy many` ?

**Niveau :** Introduction  
**Thèmes :** registry, cicd, deploy

- **A.** Rebuilder depuis Git sur staging puis encore une fois sur production.
- **B.** Construire une image une fois, la pousser au registry, puis déployer exactement cette image en staging et en production.
- **C.** Copier le système de fichiers du conteneur staging vers la production.
- **D.** Utiliser uniquement `latest` dans tous les environnements.

**Indice :** Le mot important est `once` : quel artefact ne doit être construit qu’une seule fois ?

**Réponse :** B

**Explication :** La même image doit idéalement être testée en staging puis promue telle quelle en production.

---

## 11. Un frontend Vue s’exécute dans le navigateur et appelle `http://api:8000/users`. Dans Compose, le service backend s’appelle bien `api`, mais le navigateur ne résout pas ce nom. Pourquoi ?

**Niveau :** Intermédiaire  
**Thèmes :** network, frontend, browser

- **A.** Le DNS interne `api` n’est disponible qu’aux conteneurs du réseau Docker.
- **B.** Le service `api` doit obligatoirement utiliser PostgreSQL pour être résolu.
- **C.** Le frontend et l’API doivent partager un volume pour résoudre leurs hostnames.
- **D.** Docker interdit aux applications frontend d’utiliser des noms de service.

**Indice :** Demande-toi où le code Vue s’exécute réellement après chargement.

**Réponse :** A

**Explication :** Le DNS Compose n’existe que dans les réseaux Docker. Le navigateur doit passer par un port publié ou un domaine public.

---

## 12. Une application stocke PostgreSQL dans `db_data` mais les uploads utilisateurs uniquement dans `/app/uploads` sans volume. Après suppression et recréation des conteneurs, que risque-t-il de se passer ?

**Niveau :** Intermédiaire  
**Thèmes :** volume, uploads, persistence

- **A.** La base et les uploads sont tous deux conservés.
- **B.** La base est conservée, mais les uploads du conteneur supprimé peuvent être perdus.
- **C.** Les uploads sont conservés, mais la base est perdue.
- **D.** Tout est forcément perdu après `docker compose down`.

**Indice :** Fais l’inventaire des données qui vivent dans un volume et de celles qui vivent dans la couche writable.

**Réponse :** B

**Explication :** Toute donnée irremplaçable doit être persistée explicitement : base, uploads, documents, etc.

---

## 13. Ton Dockerfile fait `COPY . /app`, puis Compose monte `.:/app` en développement. Pourquoi le contenu de l’image à `/app` semble-t-il disparaître au runtime ?

**Niveau :** Intermédiaire  
**Thèmes :** bind-mount, filesystem

- **A.** Le bind mount masque le contenu de `/app` fourni par l’image tant qu’il est monté.
- **B.** Compose supprime automatiquement les fichiers copiés pendant le build.
- **C.** `COPY` transforme automatiquement `/app` en volume anonyme.
- **D.** Docker fusionne toujours les deux dossiers fichier par fichier.

**Indice :** Imagine que tu poses un nouveau dossier par-dessus un ancien au même chemin.

**Réponse :** A

**Explication :** Le bind mount remplace la vue du chemin monté dans le conteneur ; l’image n’est pas modifiée pour autant.

---

## 14. Pourquoi voit-on parfois `.:/app` puis `/app/node_modules` dans un Compose Node de développement ?

**Niveau :** Intermédiaire  
**Thèmes :** node_modules, bind-mount, dev

- **A.** Pour utiliser le code de l’hôte tout en gardant des `node_modules` adaptés au Linux du conteneur.
- **B.** Pour envoyer les `node_modules` du conteneur vers Git.
- **C.** Pour rendre `node_modules` accessible au navigateur.
- **D.** Pour que Docker désactive le hot reload.

**Indice :** Pense aux différences possibles entre macOS/Windows et Linux.

**Réponse :** A

**Explication :** Certaines dépendances contiennent des binaires natifs ; garder les `node_modules` dans le conteneur évite les incompatibilités de plateforme.

---

## 15. Un Compose définit deux réseaux : `frontend` et `backend`. `web` est uniquement sur `frontend`, `api` sur les deux, `db` uniquement sur `backend`. Quelle communication n’est pas possible directement ?

**Niveau :** Intermédiaire  
**Thèmes :** network, segmentation

- **A.** `web` → `api`
- **B.** `api` → `db`
- **C.** `web` → `db`
- **D.** `api` → `web`

**Indice :** Deux services doivent partager au moins un réseau pour communiquer directement par le réseau Compose.

**Réponse :** C

**Explication :** Les réseaux explicites permettent d’isoler la base du frontend tout en laissant l’API communiquer avec les deux côtés.

---

## 16. Pourquoi `api` et `migrate` peuvent-ils utiliser exactement la même image tout en ayant des comportements différents ?

**Niveau :** Intermédiaire  
**Thèmes :** image, command, migrations

- **A.** Parce que chaque service peut lancer une commande différente à partir du même environnement logiciel.
- **B.** Parce que Docker transforme automatiquement l’image API en image de migration.
- **C.** Parce que le conteneur `migrate` modifie définitivement l’image de l’API.
- **D.** Parce que `api` et `migrate` doivent en réalité être le même conteneur.

**Indice :** Sépare mentalement « ce qui est installé » de « ce qui est exécuté au démarrage ».

**Réponse :** A

**Explication :** Une image peut fournir le code et les dépendances nécessaires à plusieurs rôles : API, migration, worker, CLI, etc.

---

## 17. Une app Node attend `process.env.AUTH_SECRET`, mais Compose lui fournit uniquement un Docker Secret nommé `auth_secret`. Que faut-il anticiper ?

**Niveau :** Intermédiaire  
**Thèmes :** secrets, docker-secrets, node

- **A.** Docker crée automatiquement `AUTH_SECRET` à partir du secret.
- **B.** L’app doit lire `/run/secrets/auth_secret` ou utiliser un mécanisme explicite d’injection.
- **C.** Il suffit d’ouvrir un port supplémentaire.
- **D.** Il faut copier le secret dans l’image pendant le build.

**Indice :** Compare la forme attendue par l’application avec la forme fournie par Docker Secrets.

**Réponse :** B

**Explication :** Un Docker Secret est typiquement disponible sous `/run/secrets/<nom>` ; l’application doit savoir lire ce fichier ou recevoir la valeur autrement.

---

## 18. À quoi sert principalement un bloc `x-api-dev: &api-dev` réutilisé avec `<<: *api-dev` ?

**Niveau :** Intermédiaire  
**Thèmes :** extensions, yaml, compose

- **A.** À factoriser une configuration commune entre plusieurs services.
- **B.** À créer automatiquement un réseau supplémentaire.
- **C.** À créer un secret Docker.
- **D.** À démarrer un service caché nommé `x-api-dev`.

**Indice :** Observe ce qui se répète souvent entre `api`, `migrate` ou `worker`.

**Réponse :** A

**Explication :** Ce pattern réduit la duplication pour `build`, `image`, `environment`, `volumes`, etc.

---

## 19. Pourquoi un stage `builder` peut-il contenir `gcc` et des headers de compilation alors que le stage `production` ne les contient pas ?

**Niveau :** Intermédiaire  
**Thèmes :** multistage, runtime

- **A.** Parce que ces outils sont nécessaires pour construire certaines dépendances, mais pas forcément pour les exécuter.
- **B.** Parce que Docker désinstalle automatiquement tous les packages dans le dernier stage.
- **C.** Parce que `production` utilise toujours le système de fichiers du stage `builder` en lecture seule.
- **D.** Parce que les compilateurs ne fonctionnent jamais dans un conteneur de production.

**Indice :** Distingue dépendances de build et dépendances de runtime.

**Réponse :** A

**Explication :** Le multi-stage permet de garder l’image finale minimale en n’y copiant que les artefacts nécessaires.

---

## 20. Quelle différence devrait principalement exister entre staging et production si l’on veut tester fidèlement la release ?

**Niveau :** Intermédiaire  
**Thèmes :** staging, production, config

- **A.** Des images Docker différentes construites avec du code différent.
- **B.** La configuration, les secrets, les URLs et les bases de données, mais idéalement pas l’image.
- **C.** Staging doit obligatoirement utiliser le stage `dev`.
- **D.** Production doit toujours être construite directement sur le serveur cible.

**Indice :** Le staging sert à tester ce que tu vas réellement mettre en production.

**Réponse :** B

**Explication :** Même image, configurations distinctes : c’est ce qui permet une validation fiable avant promotion.

---

## 21. Tu veux garantir la séquence : PostgreSQL prêt → migrations terminées → API démarrée. Quelle chaîne est la plus correcte ?

**Niveau :** Avancé  
**Thèmes :** compose, healthcheck, architecture

- **A.** `db: service_started` → `api`, migrations lancées ensuite manuellement.
- **B.** `db` avec healthcheck → `migrate` dépend de `service_healthy` → `api` dépend de `service_completed_successfully`.
- **C.** `api` dépend de `db: service_completed_successfully`.
- **D.** Publier `5432:5432` puis démarrer tous les services en parallèle.

**Indice :** Tu as besoin d’une condition de santé pour un service long vivant, puis d’une condition de fin réussie pour un job.

**Réponse :** B

**Explication :** Le DB doit devenir healthy ; le job de migration doit finir avec exit code 0 ; l’API peut alors démarrer.

---

## 22. Quel frontend a généralement le plus d’intérêt à être dockerisé lorsqu’il est déployé sur un VPS/Coolify ?

**Niveau :** Avancé  
**Thèmes :** frontend, ssr, deployment

- **A.** Un frontend SSR qui nécessite un runtime Node en production.
- **B.** Une SPA Vue statique servie directement par Netlify.
- **C.** Un simple dossier d’images statiques hébergé sur un CDN.
- **D.** Un fichier HTML unique ouvert localement dans le navigateur.

**Indice :** Demande-toi s’il existe réellement un processus serveur à maintenir en production.

**Réponse :** A

**Explication :** Le besoin de Docker dépend surtout du runtime et de la plateforme de déploiement, pas du fait d’être headless.

---

## 23. Une SPA Vue est construite en `dist/` puis placée dans une image nginx. Que fait nginx dans ce cas ?

**Niveau :** Avancé  
**Thèmes :** frontend, static, nginx

- **A.** Il exécute Vue côté serveur pour produire chaque page.
- **B.** Il sert les fichiers HTML, JS, CSS et autres assets du dossier `dist/` via HTTP.
- **C.** Il remplace la base PostgreSQL.
- **D.** Il compile TypeScript à chaque requête.

**Indice :** Après `npm run build`, il n’y a plus forcément de runtime Node à faire tourner.

**Réponse :** B

**Explication :** Dans ce cas, nginx ne fait que distribuer les artefacts statiques produits au build.

---

## 24. Pourquoi est-il préférable de déployer `app:a81f25d` plutôt que seulement `app:latest` en production ?

**Niveau :** Avancé  
**Thèmes :** registry, immutable, release

- **A.** Parce qu’un tag basé sur le SHA identifie précisément l’artefact déployé.
- **B.** Parce que Docker interdit `latest` en production.
- **C.** Parce qu’un SHA rend l’image automatiquement plus petite.
- **D.** Parce qu’un SHA chiffre automatiquement l’image.

**Indice :** Pense audit, rollback et identification exacte de la version.

**Réponse :** A

**Explication :** Un tag immuable ou un digest permet de savoir exactement quel artefact a été testé et déployé.

---

## 25. La CI a construit `registry.example.org/app:a81f25d` et les tests de staging passent. Quelle action est la plus cohérente pour la production ?

**Niveau :** Avancé  
**Thèmes :** registry, staging, production

- **A.** Rebuilder le commit sur le serveur de production.
- **B.** Déployer exactement `registry.example.org/app:a81f25d` en production.
- **C.** Copier le système de fichiers du conteneur staging.
- **D.** Modifier manuellement le conteneur staging puis le renommer `prod`.

**Indice :** Après validation du staging, quel élément doit être promu sans être reconstruit ?

**Réponse :** B

**Explication :** Le registry sert précisément à distribuer le même artefact à plusieurs environnements.

---

## 26. Une app sur VPS/Coolify contient une API, PostgreSQL et des uploads utilisateurs. Le code est dans Git et les images dans un registry. Que faut-il prioritairement sauvegarder ?

**Niveau :** Avancé  
**Thèmes :** backup, persistence, architecture

- **A.** La couche writable de chaque conteneur uniquement.
- **B.** La base PostgreSQL et les uploads utilisateurs.
- **C.** Uniquement l’image Docker de l’API.
- **D.** Uniquement `compose.yaml`.

**Indice :** Sépare ce qui peut être reconstruit depuis Git/registry de ce qui a été créé par les utilisateurs.

**Réponse :** B

**Explication :** Le code et les images sont reproductibles ; la base et les fichiers utilisateurs doivent être sauvegardés.

---

## 27. Pour PostgreSQL en production, pourquoi préfère-t-on généralement un backup `pg_dump` cohérent plutôt qu’une simple archive à chaud du volume de données ?

**Niveau :** Avancé  
**Thèmes :** volume, backup, database

- **A.** Parce qu’un dump est produit par PostgreSQL et respecte mieux la cohérence logique de la base.
- **B.** Parce qu’un volume Docker ne contient jamais les données PostgreSQL.
- **C.** Parce que `pg_dump` sauvegarde automatiquement les images Docker.
- **D.** Parce que Docker interdit de sauvegarder des volumes.

**Indice :** Pense à la différence entre copier des fichiers bruts et demander au moteur de base de produire lui-même son export.

**Réponse :** A

**Explication :** Les sauvegardes database-aware sont généralement plus sûres pour garantir une restauration cohérente.

---

## 28. Un monorepo contient `apps/web` et `apps/api`. Quel avantage Docker Compose apporte surtout en développement local ?

**Niveau :** Avancé  
**Thèmes :** monorepo, compose, architecture

- **A.** Il permet d’orchestrer les services locaux nécessaires, comme l’API et PostgreSQL, avec un réseau et une configuration communs.
- **B.** Il oblige le frontend et l’API à être déployés ensemble en production.
- **C.** Il remplace Git pour versionner les deux applications.
- **D.** Il impose l’utilisation d’un seul conteneur pour tout le monorepo.

**Indice :** Pense surtout à l’expérience de développement et à la coordination des services.

**Réponse :** A

**Explication :** Compose facilite un environnement local reproductible tout en gardant les services séparés.

---

## 29. Dans une stack Coolify sur un VPS, quel rôle joue généralement Coolify par rapport à Docker ?

**Niveau :** Avancé  
**Thèmes :** coolify, deployment, docker

- **A.** Il remplace complètement Docker et exécute les applications sans conteneurs.
- **B.** Il automatise une partie du déploiement, du proxy, des domaines, des variables et de l’exploitation autour des conteneurs.
- **C.** Il remplace Git et stocke nécessairement tout le code source.
- **D.** Il remplace automatiquement PostgreSQL par sa propre base interne.

**Indice :** Considère Coolify comme une couche de gestion autour de Docker, pas comme un substitut au runtime.

**Réponse :** B

**Explication :** Coolify simplifie les opérations courantes mais les applications restent des workloads Docker standards.

---

## 30. Pour un projet Vue SPA + FastAPI + PostgreSQL, quelle stratégie est la plus cohérente si le frontend est sur Netlify, l’API sur Railway et la DB sur Neon ?

**Niveau :** Avancé  
**Thèmes :** architecture, dockerization, deployment

- **A.** Dockeriser obligatoirement les trois composants en production.
- **B.** Dockeriser surtout l’API pour sa portabilité, utiliser PostgreSQL Docker en local, et laisser Netlify/Neon gérer respectivement le frontend statique et la DB en production.
- **C.** Ne jamais utiliser Docker si une seule plateforme managée est présente.
- **D.** Dockeriser uniquement la SPA Vue et jamais l’API.

**Indice :** Dockeriser ou non dépend surtout du runtime et de la plateforme de déploiement.

**Réponse :** B

**Explication :** Une SPA statique peut être servie nativement par Netlify ; Neon gère PostgreSQL ; Docker reste très utile pour rendre le backend portable et pour reproduire la DB localement.

---
