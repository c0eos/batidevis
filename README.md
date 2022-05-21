## TODO

- backend devis+facture -> ajout interlocuteur
- drop htX, tvaX, tauxX

## Structure du projet

- backend by components
- logging by pino
- db avec prisma
- erreurs centralisées
- routes protégées par défaut
- typescript + eslint
- validation schema avec yup

## Backend

### Routes

- Utilisateurs

  - [x] se connecter
  - [x] ajouter
  - [x] supprimer
  - [x] modifier
  - [x] lister tous
  - [x] lister 1

- Clients

  - [ ] ajouter
  - [x] supprimer (foreign?)
  - [ ] modifier
  - [x] lister tous
  - [x] lister 1

- Devis

  - [ ] ajouter
  - [x] supprimer (foreign?)
  - [ ] modifier
  - [x] lister tous
  - [x] lister 1
  - [x] lister details

- Factures

  - [ ] ajouter
  - [x] supprimer (foreign?)
  - [ ] modifier
  - [x] lister tous
  - [x] lister 1
  - [x] lister details

- Acomptes
  - [ ] ajouter
  - [x] supprimer
  - [ ] modifier
  - [x] lister tous
  - [x] lister 1

## Frontend

- toutes les routes sont protégées, sauf login
- affichage tableaux avec `react-table`, afin de trier, filtrer facilement + pagination
