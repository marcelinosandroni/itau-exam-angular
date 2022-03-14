export interface Translate {
  home: Home
  business: Business
  pagination: Pagination
  user: User
  currency: string
}

type Home = {
  title: string
  description: string
  search: string
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
