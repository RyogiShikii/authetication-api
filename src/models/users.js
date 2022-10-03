import { Entity, Schema } from 'redis-om'
import client from '../lib/redis.js'

class User extends Entity {}

const userSchema = new Schema(User, {
  username: {type: 'string'},
  email: {type: 'string'},
  password: {type: 'string'},
})

export const userRepository = client.fetchRepository(userSchema)

//Create User Entity Search Index
await userRepository.createIndex()