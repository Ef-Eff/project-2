const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/project-2-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'Please don\'t hack me bro (im rich I can pay you off)';

module.exports = { port, env, dbURI, sessionSecret };
