import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type UserDocument = cartera & Document;
class percentage {
  @ApiProperty({ default: 11 })
  value: number;
  @ApiProperty({ default: 'mame' })
  description: string;
  @ApiProperty({ default: 1 })
  position: number;
}
@Schema({ versionKey: false, timestamps: true })
export class cartera {
  @Prop({
    type: String, required: true,
    unique: true
  })
  @ApiProperty({ default: 'nombre del detalle' })
  name: string;
  @Prop({
    type: String, required: false
  })// TODO: .................... nombre

  @ApiProperty({ default: 'descripción del detalle' })
  description: string;
  @Prop([percentage])// TODO: .................... nombre
  @ApiProperty({ type: [percentage] })
  por: percentage[];

}

export const CarteraSchema = SchemaFactory.createForClass(cartera);

