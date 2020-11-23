import {Document} from "mongoose"
import { AddressDto } from "./model/address.dto"
import { IPicture } from "./model/IPicture"

export class User extends Document {
    name: string
    lastName: string
    password: string
    email: string
    age?: number
    website?: string
    address?: AddressDto
    friends?: Array<string>
    pictures?: Array<IPicture>
}