import { OAuth2Client } from 'google-auth-library';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export class SocialAuth {
  constructor() {
    this.providers = new Map();
    this.initializePassport();
  }

  registerProvider(provider, config) {
    this.providers.set(provider, config);
    
    passport.use(new GoogleStrategy({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL
    }, (token, tokenSecret, profile, done) => {
      this.handleSocialAuth(provider, profile)
        .then(user => done(null, user))
        .catch(err => done(err));
    }));
  }

  async handleSocialAuth(provider, profile) {
    const existingUser = await this.findBySocialId(provider, profile.id);
    
    return existingUser || this.createSocialUser(provider, {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });
  }

  initializePassport() {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
  }
}