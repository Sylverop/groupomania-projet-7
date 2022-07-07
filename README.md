FRONTEND
<---------------------------------------------------------------------->
# Groupomania

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.1.

## Development server

Run `npm start` for a dev server. Navigate to `http://groupomania.infra:4200/`. The application will automatically reload if you change any of the source files. ** You must setup your hosts file with 127.0.0.1 groupomania.infra **. This is mandatory to follow those steps to make the CORS work.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory for production needs. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
<-------------------------------------------------------------------------->

BACKEND
<-------------------------------------------------------------------------->
Groupomania-P7
Projet 7 - Construire une API sécurisée pour une application de réseau sociale

Objectifs du projet

Développer dune application web nommée "Groupomania" dans laquelle les utilisateurs peuvent ajouter des publications, des commentaires, des likes pour les différentes publications proposées par les autres utilisateurs. 

Les technique utilisés
Développement Backend en Javascript 
 Node.js,  
 Express, 
 MongoDB.

MESURES DE SECURITE MISE EN PLACE
.Hashage du mot de passe utilisateur avec bcrypt

.helmet est utilisé pour la sécurité 

.Cryptage des emails utilisateurs dans la base de données avec crypto-js

.Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator

.Utilisation de variables d'environnement pour les données sensibles avec dotenv

.Authentification de l'utilisateur par token avec jsonwebtoken

Tester l'application
1 - Cloner le repository, et le lancer :

Dans un terminal, accéder au dossier du frontend

Installer les dépendances avec: npm install

Lancer le frontend avec: npm start

2 - Lancer le frontend

Dans un autre terminal, accéder au dossier du backend

Installer les dépendances: npm install

Lancer le backend avec : npm start

3 - Le frontend est accessible à l'adresse http://groupomania.intra

4 - Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:5000


