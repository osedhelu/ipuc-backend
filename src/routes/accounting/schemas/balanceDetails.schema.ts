import { enumStatus, typeDetailBalnce } from '@interfaces/balance';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = _balanceD & Document;
const validateType = {
  values: Object.keys(typeDetailBalnce),
  message: "{VALUE} no es una transaccion permitida",
};
const statusType = {
  values: Object.keys(enumStatus),
  message: "{VALUE} no es valido este estado",
};

@Schema({ versionKey: false, timestamps: true })
export class _balanceD {
  //-----------------------------------------------
  @Prop({
    type: String,
    required: true,
  })
  from: string;
  //-----------------------------------------------
  @Prop({
    type: String,
    required: true,
  })
  to: string;
  //-----------------------------------------------
  @Prop({
    type: Number,
    required: true,
  })
  amount: number;
  //-----------------------------------------------
  @Prop({
    type: String,
    enum: validateType,
  })
  type: string;
  //-----------------------------------------------
  @Prop({
    type: String,
    enum: statusType,
  })
  status: string;
  //-----------------------------------------------
}

export const _BalanceDSchema = SchemaFactory.createForClass(_balanceD);

