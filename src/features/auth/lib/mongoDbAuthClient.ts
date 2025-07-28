import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI" while loading mongoDbAuthClient')
}

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = client.connect()

export default clientPromise
