# Projet de fin de formation FSJS10

Ce projet consiste en une web app servant à gérer une liste de clients, créer des devis et produire les factures associées s'ils sont acceptés.

Il est destiné à un client artisan, ADT Services, qui souhaite mettre à jour son outil de travail, le programme Batigest, qu'il utilise depuis fin 2012. Le transfert des données existantes et la simplification du flux de travail sont des contraintes importantes.

## Vue d'ensemble

Le projet est divisé en 2 parties, le backend Node connecté à une base de donnée SQLite, et le frontend React, qui communiquent par requêtes `axios`. Il est programmé avec TypeScript. Les données entrées sont validées à l'aide de la librairie `yup` afin d'être conformes.

Il est développé en accord avec la méthode de travail de l'artisan, qui consiste en :

- création d'un client si besoin
- rédaction des "méta-données" du devis (principalement client et adresse du chantier)
- rédaction du contenu du devis (ouvrages, prix et TVA applicable)
- transfert d'un devis en facture si accepté par le client

## Backend

Le backend consiste en une application `Express` qui sert une API RESTful.

La base de donnée est un fichier SQLite, et l'application interagit avec grâce à l'ORM `prisma`, qui ajoute une couche d'abstraction au SQL, ainsi que la possibilité de facilement faire des migrations (`Entrep.sql` est un dump de la BDD).

Les tables sont les suivantes :

- `User`, `Client`, `Devis` et `Facture`, qui contiennent respectivement les utilisateurs de l'application, la liste des clients, des devis et des factures ;
- `DevisLigne` et `FactureLigne` qui contiennent le contenu de chaque devis/facture.
- `Acompte`, qui n'est pas encore utilisé

Comme le projet vient en succession du programme Batigest, les colonnes reflètent ça au travers de leur nom, et certaines sont conservées bien qu'elles ne soient pas encore utilisées.

Il y a 4 routes, avec modèles associés : `/api/v1/users`, `/api/v1/clients`, `/api/v1/devis` et `/api/v1/factures`.

Puisque le projet consiste en une application professionnelle, toutes les routes, à l'exception du login, sont protégées et nécessitent une authentification par token.

Les erreurs sont gérées par un middleware qui retourne un message d'erreur et un code HTTP approprié. Si l'erreur est de type `AppError` et `isOperational = true`,
cela signifie qu'elle est volontairement renvoyée (par exemple, une erreur `401` pour la demande d'un devis dont l'id serait introuvable). Dans le cas contraire, c'est une erreur fatale, et le programme se termine, et devra être relancé par le système de déploiement approprié (docker, systemd, etc.). D'autre part, le programme logue les erreurs rencontrées à la fois dans le terminal et dans un fichier à l'aide de la librairie `pino`.

## Frontend

Le frontend consiste en une application `React` avec store `Redux`. Il communique avec le backend grâce à la librairie `axios`.

Il utilise fortement 2 libraires :

- `react-table` sert pour la création de tables dynamiques (liste filtrables et paginées des clients, devis et factures, avec colonnes personnalisables)
- `react-hook-form` pour simplifier l'utilisation de l'ensemble des formulaires (évite la création manuelle de nombreuses `state`, et permet aisément d'ajouter et supprimer des lignes pour les devis et factures)

La majorité du CSS est géré par `tailwind.css` qui fourni des classes très proches du CSS brut, mais écrit au même niveau que la structure JSX, ce qui simplifie le temps de développement et de modification.
Toutefois le bouton d'ajout de client et devis est stylisé manuellement, afin de montrer mes connaissances de CSS.

La navigation se fait grâce à `react-router-dom`, et les routes sont protégées par le component `AuthProvider`, qui est également chargé de récupérer les données initiales au moment de la connexion.

L'utilisateur de démonstration est `demo@demo.com` avec mot de passe `demo` et il faut la variable d'environnement `REACT_APP_API_URL` qui pointe vers le backend (par exemple : `REACT_APP_API_URL=http://localhost:9000/api/v1`).

### Clients

La partie clients est relativement simple :

- la page principale liste les clients grâce au component `Table`, permet d'en ajouter à l'aide d'un bouton dédié, et d'accéder au détail d'un client en double cliquant dans la liste
- la liste ne contient que le minimum possible de colonnes si l'appareil est un mobile, vu que l'usage de l'application se fera principalement sur PC
- il est possible de filtrer / chercher par colonne. La recherche est `fuzzy`, et utilise les modificateurs classiques d'UNIX (`'` pour recherche exacte, `!` pour l'inverse, etc.)
- l’édition et l'ajout reposent sur un component commun, `ClientForm`
- les données entrées sont validées suivant un schéma `yup`, et formatées si nécessaire (par exemple, un numéro de portable doit commencer par 06 ou 07, et contient 10 chiffres groupés par 2)

### Devis

La liste des devis utilise le même component `Table`. Une amélioration est toutefois possible pour le filtrage par total TTC, qui cherche actuellement par texte et non pas par valeur numérique...

L'ajout et la modification suivent le même principe que pour les clients, avec un component commun, l'accès par double clique dans la liste et le bouton d'ajout.

L'édition d'un devis se fait en 2 parties, d'abord les "méta-données" du devis, c'est-à-dire le client associé, l'adresse du chantier et son intitulé, puis ensuite son contenu.

L'ajout du client associé se fait rapidement grâce à une barre de recherche, qui permet également de pré-remplir l'adresse et l'interlocuteur par défaut.

L'édition du contenu peut se faire une fois les méta-données enregistrées une première fois (ce qui génère un code devis unique).
Le contenu d'un devis consiste en un ensemble de lignes correspondant chacune à du matériel, un ouvrage, etc. nécessitant au moins un libellé (i.e. description), une quantité, un prix unitaire, et le taux de TVA applicable en %.

La sauvegarde du contenu conduit le backend à supprimer, insérer ou modifier les lignes selon besoin, et à recalculer les totaux.

Une fois un devis rédigé puis accepté par le client, il est possible de le transférer en facture, ce qui basiquement copie les données du devis en facture puis le rend non-éditable et non-supprimable.

### Factures

Les factures sont à peu de choses près équivalentes aux devis. Le seul moyen de créer une facture est de transférer un devis. Une facture étant un document final, ou presque, elles ne sont pas supprimables, et leur édition est plus limitée que pour un devis.

À terme, elles contiendront également des remises et acomptes.

### Paramètres

La page de paramètres permet d'éditer l'utilisateur actuel (mail et/ou mot de passe), mais également d'ajouter et supprimer d'autres utilisateurs. Puisque c'est un programme destiné à un professionnel, il n'est pas possible pour un non-utilisateur de s'inscrire par lui-même.

À terme, c'est ici qu'il sera possible d'éditer les informations de l'entreprise, comme le numéro SIRET ou les coordonnées de contact.

## Conclusion

Le projet, bien que fonctionnel, n'est que partiellement terminé. Il répond au cahier des charges le plus essentiel, mais comme le client m'a contacté fin avril, par contrainte de temps pour le rendu pour la 3W Academy, certaines fonctionnalités n'ont pas encore été complétées : il me faut encore gérer les factures d'acomptes, la possibilité de faire des remises sur facture ainsi que générer un PDF pour envoi ou impression. Un gros plus en terme de productivité serait également de suggérer les adresses et les ouvrages selon catalogue lors de la rédaction des devis.
