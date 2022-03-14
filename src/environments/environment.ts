import { Environment } from "./environment.interface";
import 'zone.js/plugins/zone-error';

// default development settings
export const environment: Environment = {
  production: false,
  name: 'development',
  port: 4200,
  api: 'http://localhost:3210/business',
  useInMemoryData: false,
  logger: true
};
