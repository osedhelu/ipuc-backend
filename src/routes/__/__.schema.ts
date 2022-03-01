import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = __ & Document;

@Schema({ versionKey: false })
export class __ {
  @Prop({
    type: String, required: false
  })
  name: string;

}

export const __Schema = SchemaFactory.createForClass(__);

