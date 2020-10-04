import {Document} from "mongoose"

export class Movie extends Document {
    name: string
    director: string
    actors?: Array<string>
}