import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = country & Document;

@Schema({ versionKey: false })
export class country {
  @Prop({
    type: String, required: false
  })
  nombre: string;
  @Prop({
    type: String, required: false
  })// TODO: .................... nombre
  name: string;
  @Prop({
    type: String, required: false
  })
  nom: string;
  @Prop({
    type: String, required: false
  })
  iso2: string;
  @Prop({
    type: String, required: false
  })
  iso3: string;
  @Prop({
    type: String, required: false
  })
  phone_code: string;
}

export const countrySchema = SchemaFactory.createForClass(country);

