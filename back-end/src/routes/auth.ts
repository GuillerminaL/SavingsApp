import { Router } from "express";
import { passportAuthenticate, passportAuthenticateCallback, onSuccess, onError, onSignout } from "../controllers/google_oauth";
import passport from 'passport';
const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect to frontend or send token
  res.redirect('/');
});
router.get('/success', onSuccess);
router.get('/error', onError);
router.get('/signout', onSignout);

export default router;
