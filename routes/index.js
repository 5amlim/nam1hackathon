import {Router} from "express";
import passport from "passport";
//import routes from controllers

const router = Router()

router.get("/", (req, res) => res.send("This is the api root!"));
router.get('/auth/google', passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  ));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/movies',
      failureRedirect: '/movies'
    }
  ));
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/movies');
  });

// ex. router.use("/route", ____Routes)
// router.use("/", );
// router.use("/",);

export default router;
