import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { IsNotEmpty } from 'class-validator';


@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        console.log('value: ', value)
        if (!isValid) throw new BadRequestException('Invalid ID!');
        return value;
    }
}

export class CreateUserDto {
    @IsNotEmpty()
    domainName!: string;

    @IsNotEmpty()
    ownerName!: string;

    @IsNotEmpty()
    ownerId!: string;
}