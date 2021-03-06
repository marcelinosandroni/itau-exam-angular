import { Environment } from "./environment.interface";

// production environment
// update settings to deploy
export const environment: Environment = {
  production: true,
  name: 'production',
  port: 80,
  api: 'https://www.businessapi.heroku.com'
};
