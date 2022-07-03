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

Lancer le backend avec : nodemon server

3 - Le frontend est accessible à l'adresse http://localhost:4200

4 - Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:5000

Connection à la BDD

mongodb+srv://sylvair15:killthemall4@groupomania.anmym.mongodb.net/test


Variable d'environnement
.env 

PORT=5000
DB_USER_PASS=sylvair15:killthemall4
JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MzQ4NjA3NCwiaWF0IjoxNjUzNDg2MDc0fQ.iGxSuyEhTfX2Xamb82NVmcczvy6o5UZuagDaWEiCi-A
CLIENT_URL=http://groupomania.intra