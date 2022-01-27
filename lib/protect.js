module.exports = {

  // Para usuarios no registrados, evitaremos que pueda ver las paginas de añadir, profile, etc.
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/authentication/signin");
    }
  },


  // Cuando el usuario esté registrado y logueado evitaremos que pueda visitar SignIN y SignUP
  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/authentication/profile");
    }
  },
};
