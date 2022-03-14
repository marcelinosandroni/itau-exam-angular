import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { BUSINESS } from "./business.mock";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const business = BUSINESS
    return { business }
  }
}
