import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = product & Document;
import * as mongoose from 'mongoose'
@Schema({ versionKey: false })
export class product {
  @Prop({
    type: Number, required: false
  })
  ID: number;
  @Prop({
    type: Boolean, required: false
  })
  Favorite: boolean;
  @Prop({
    type: String, required: false
  })
  name: string;
  @Prop({
    type: String, required: false
  })
  status: boolean;
  @Prop({
    type: String, required: false
  })

  Price: number;
  @Prop({
    type: String, required: false
  })
  img: string;
  @Prop({
    type: String, required: false
  })
  Features: string
  @Prop({
    type: Number, required: false
  })
  timestamp: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: "user"
  })
  user: string
}

export const ProductSchema = SchemaFactory.createForClass(product);
