const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInfoDTO } = require("../DTO/userinfo.DTO");


// Création d'un profil Utilisateur

exports.signUp = (req, res, next) => {
  // Chiffrement du password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user.save()
      .then((user) =>
        res.status(201).json({
          user: user._id,
          message: "Utilisateur créé",
        })
      )
      .catch(error => res.status(400).json({ message : error.message}));
      })
      .catch(error => res.status(500).json({ error }))
  };


// Connexion au profil Utilisateur

exports.logIn = (req, res, next ) => {
  User.findOne({ email: req.body.email })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      // Comparaison des password pour validation
      bcrypt.compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: "Mot de passe incorrect" });
        }
        // création d'un token pour l'utilisateur
        
        res.status(200).json(
            new UserInfoDTO( user._id, user.name, jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' } ), " Connexion réussie" )     
        );
      });
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

// Déconnexion de l'utilisateur

exports.logOut = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};