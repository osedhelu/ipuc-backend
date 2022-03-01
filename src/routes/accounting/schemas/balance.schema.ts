import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { cartera } from '@routes/carteras/carteras.schema';
import { Accounts } from '@routes/cuentas/__.schema';
import { Types } from 'mongoose';
import { _balanceD } from './balanceDetails.schema';
export type UserDocument = balance & Document;

@Schema({ versionKey: false, timestamps: true })
export class balance {
  @Prop({
    type: Types.ObjectId,
    ref: Accounts.name,
    required: true,
  })
  cuenta: string;
  //-----------------------------------------------
  @Prop({
    type: String,
    required: false,
  })
  btcRef: string;
  //-----------------------------------------------
  @Prop({
    type: Number,
    required: true,
    default: 0,
  }
  )
  debito: number;
  //-----------------------------------------------
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  credito: number;
  //-----------------------------------------------
  @Prop({
    type: Number,
    required: false,
  })
  prevBalance: number;
  //-----------------------------------------------
  @Prop({
    type: Types.ObjectId,
    ref: cartera.name,
  })
  wallet: any;
  //-----------------------------------------------
  @Prop({
    type: String,
    required: true,
  })
  chainToken: string;
  //-----------------------------------------------
  @Prop({
    type: Types.ObjectId,
    ref: _balanceD.name,
  })
  detail: string;
  //-----------------------------------------------
  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  completed: number;
  @Prop({
    type: Date,
    required: true
  })
  fecha: Date
  @Prop({
    type: String,
    required: false,
  })
  origin: string
  _id?: string

}

export const BalanceSchema = SchemaFactory.createForClass(balance);

