import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/app/core/logger.service';
import { NOT_FOUND } from 'src/app/shared/constants';
import { IsLoadingService } from 'src/app/shared/is-loading.service';
import { Business } from 'src/app/shared/models/business';
import { Environment } from 'src/environments/environment.interface';
import { ENVIRONMENT } from 'src/environments/environment.provider';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  businesses: Business[] = []
  apiUrl: string

  constructor(
    @Inject(ENVIRONMENT) private environment: Environment,
    private http: HttpClient,
    private logger: LoggerService,
    public isLoadingService: IsLoadingService

  ) {
    this.logger.context = BusinessService.name
    this.logger.log(` Starting bussines on ${this.environment.name} environment`)
    this.logger.log(`API URL: ${this.environment.api}`)
    this.apiUrl = this.environment.api
  }

  getBusinesses(): Observable<Business[]> {
    this.isLoadingService.start()
    const response$ = this.http.get<Business[]>(this.apiUrl)
    response$.subscribe(() => {
      this.isLoadingService.end()
    })

    return response$
  }

  getBusinessById(id: number): Observable<Business> {
    return this.http.get<Business>(`${this.apiUrl}/${id}`)
  }

  getBusinessPosition(id: number): number {
    const businessIndex = this.businesses.findIndex(business => business.id === id)

    if (businessIndex === NOT_FOUND) {
      throw new Error('Business not found')
    }

    return businessIndex
  }

  updateBusiness(id: number, updateBusiness: Partial<Business>): Observable<Business> {
    return this.http.put<Business>(`${this.apiUrl}/${id}`, updateBusiness)
    // const businessPosition = this.getBusinessPosition(id)
    // const foundBusiness = this.businesses[businessPosition]
    // this.businesses[businessPosition] = { ...foundBusiness, ...updateBusiness }
  }

  removeBusiness(id: number): void {
    const businessPosition = this.getBusinessPosition(id)
    this.businesses.splice(businessPosition, 1)
  }
}
