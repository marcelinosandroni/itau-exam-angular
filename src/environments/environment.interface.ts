export interface Environment {
  production: boolean
  name: string
  port: number
  api: string
  useInMemoryData?: boolean
  inMemoryDataDelay?: number,
  logger: boolean
}
