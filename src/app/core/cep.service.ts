import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Environment } from 'src/environments/environment.interface';
import { ENVIRONMENT } from 'src/environments/environment.provider';
import { IsLoadingService } from '../shared/is-loading.service';
import { CepResponse } from '../shared/models/cep-response';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  apiUrl = 'https://viacep.com.br/ws'
  headerOptions = {
    content: 'application/json'
  }

  constructor(@Inject(ENVIRONMENT) private environment: Environment,
    private http: HttpClient,
    private LoggerService: LoggerService,
    public isLoading: IsLoadingService
  ) {
    this.LoggerService.context = CepService.name
  }

  find(cep: number | string): Observable<CepResponse> {
    if (!cep) {
      const message = `Invalid cep: ${cep}`
      this.LoggerService.error(message)
      throw new Error(message)

    }
    const cepPattern = new RegExp(/^\d{8}$/)
    if (typeof cep === 'number') {
      this.LoggerService.warn(`converting number cep to string`)
      cep = String(cep)
    }

    const cleanCep = cep.replace(/\D/g, '')
    this.LoggerService.warn(`converted cep ${cleanCep}`)

    if (!cepPattern.test(cleanCep)) {
      const message = `Invalid cep format ${cleanCep}`
      this.LoggerService.error(message)
      throw new Error(message)
    }

    const responseFormat = 'json'
    const requestUrl = `${this.apiUrl}/${cleanCep}/${responseFormat}`

    this.isLoading.start()
    const response$ = this.http.get<CepResponse>(requestUrl)
    response$.subscribe(() => this.isLoading.end())
    return response$
  }
}
