export interface Translate {
  readonly home: Home
  readonly edit: Edit
  readonly business: Business
  readonly pagination: Pagination
  readonly user: User
  readonly currency: string
  readonly alert: Alert
}

type Home = {
  title: string
  description: string
  search: string
}

type Edit = {
  title: string
  description: string
  company: string
  address: string
  back: string
  save: string
  positive: string
  negative: string
  update: string
}

type Business = {
  name: string
  business: string
  valuation: string
  active: string
  action: string
}

type Pagination = {
  firstPage: string
  perPage: string
  page: string
  of: string
  first: string
  last: string
  next: string
  prev: string
  total: string
  register: string
}

type User = {
  director: string
}

type Alert = {
  update: string
  noItems: string
  cepError: string
  cepWarn: string
  apiError: string
}
