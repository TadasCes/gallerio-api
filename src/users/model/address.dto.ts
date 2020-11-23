import { ApiProperty } from "@nestjs/swagger";

export class AddressDto {

    @ApiProperty()
    country: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    streetAddress: string;

    @ApiProperty()
    zipCode: string;

}
