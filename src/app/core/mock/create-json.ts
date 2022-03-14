import { BUSINESS } from './business.mock'
import { writeFile } from 'fs'

const business = JSON.stringify({ BUSINESS }, null, 2)

writeFile('business.json', business, (error) => {
  if (error) {
    console.log(`Something went wrong`)
    console.log({ error })
  }
})
