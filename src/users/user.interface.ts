import {Document} from "mongoose"

export class User extends Document {
    name: string
    password: string
    email: string
    friends?: Array<string>
}