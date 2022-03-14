import { Inject, Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment.interface';
import { ENVIRONMENT } from 'src/environments/environment.provider';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private _context: string = ''
  enabled = false
  logColor = "lime"
  warnColor = 'yellow'
  errorColor = 'red'


  constructor(@Inject(ENVIRONMENT) private environment: Environment
  ) {
    if (this.environment.logger) {
      this.enabled = true
    }
  }

  get context() {
    return this._context
  }

  set context(name: string) {
    if (typeof name === 'string') {
      this._context = name
    }
  }

  log(message: string): void {
    if (!this.enabled) return
    const content = this.buildContent(message)
    console.log(`%c${content}`, `color: ${this.logColor}`)
  }

  warn(message: string): void {
    if (!this.enabled) return
    const content = this.buildContent(message)
    console.log(`%c${content}`, `color: ${this.warnColor}`)
  }


  error(message: string): void {
    if (!this.enabled) return
    const content = this.buildContent(message)
    console.log(`%c${content}`, `color: ${this.errorColor}`)
  }

  buildContent(message: string) {
    return this.context ? `${this.context} => ${message}` : message
  }


}
