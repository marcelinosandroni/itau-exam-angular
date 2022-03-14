import { InjectionToken } from "@angular/core";
import { Environment } from "./environment.interface";
import { environment } from './environment'

// Environment provider to inject in app
export const ENVIRONMENT = new InjectionToken<Environment>('environment')

export function getEnvironment(): Environment {
  return environment
}
