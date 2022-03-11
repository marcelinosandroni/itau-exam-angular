import { Injectable } from '@angular/core';
import { BUSINESS } from 'src/app/core/mock/business.mock';
import { NOT_FOUND } from 'src/app/shared/constants';
import { Business } from 'src/app/shared/models/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  businesses: Business[] = []

  constructor() {
    this.businesses = BUSINESS
  }

  getBusinesses(): Business[] {
    return this.businesses
  }

  getBusinessById(id: number): Business | undefined {
    return this.businesses.find(business => business.id === id)
  }

  getBusinessPosition(id: number): number {
    const businessIndex = this.businesses.findIndex(business => business.id === id)

    if (businessIndex === NOT_FOUND) {
      throw new Error('Business not found')
    }

    return businessIndex
  }

  updateBusiness(id: number, updateBusiness: Partial<Business>): void {
    const businessPosition = this.getBusinessPosition(id)
    const foundBusiness = this.businesses[businessPosition]
    this.businesses[businessPosition] = { ...foundBusiness, ...updateBusiness }
  }

  removeBusiness(id: number): void {
    const businessPosition = this.getBusinessPosition(id)
    this.businesses.splice(businessPosition, 1)
  }
}
