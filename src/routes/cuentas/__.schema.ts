import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { cartera } from '@routes/carteras/carteras.schema';
import { Types } from 'mongoose';
export type AccountsDocument = Accounts & Document;

@Schema({ versionKey: false, timestamps: true })
export class Accounts {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({ default: 'nombre de la cuenta' })
  name: string;
  @Prop({
    type: String,
    required: false,
  }) // TODO: .................... nombre
  @ApiProperty({ default: 'nombre de la cuenta' })
  description: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: cartera.name }],
  })
  refDetails: any;
}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);
