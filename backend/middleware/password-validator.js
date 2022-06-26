const passwordSchema = require('../models/password-schema');

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .status(400)
      .json({
        message:
          'Votre mot de passe doit contenir au moins 10 caractères, avec une lettre majuscule , une lettre minuscule et au moins 2 chiffres.',
      });
  } else {
    next();
  }
};