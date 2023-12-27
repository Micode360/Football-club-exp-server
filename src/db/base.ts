import mongoose from 'mongoose'
import keys from '../config/keys'

interface connectionProps {
  isConnected: any
}

let connection: connectionProps = {
  isConnected: false,
}

const newbase: string = keys.mongoURI!

const base = async () => {
  try {
    let db = await mongoose.connect(newbase)
    connection.isConnected = db.connections[0].readyState
    console.log('💻 Base status: ', connection.isConnected)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default base
