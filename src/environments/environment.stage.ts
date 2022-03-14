import { Environment } from "./environment.interface";

// default stage settings
export const environment: Environment = {
  production: true,
  name: 'staging',
  port: 80,
  api: 'https://businessapi-test.heroku.com'
};

