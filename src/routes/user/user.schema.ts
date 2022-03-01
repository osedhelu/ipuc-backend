import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
const Web3 = require('web3')
const rolesValidos = {
  values: ['EMPRESA', 'USUARIO', 'SUPER'],
  message: '{VALUE} no es un rol permitido',
};

const passwordV = (pass: string) => {

}
// const validateWallet = (wallet: string) => {
//   try {
//     Web3.utils.toChecksumAddress(wallet);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

const validateEmail = (email: any) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};


export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  // TODO: .................... nombre
  @Prop({
    type: String,
    required: [true, "El nombre es necesario"],
  })
  @ApiProperty({ default: 'Isabella' })
  name?: string;
  // TODO: ....................  apellidos
  @Prop({
    type: String,
    required: [true, "El apellido es necesario"],
  })
  @ApiProperty({ default: 'Catillo' })
  lastname?: string;
  // TODO: ....................name
  @Prop({
    type: String,
    required: [true, 'El username es necesario'],
    unique: true
  })
  @ApiProperty({ default: 'Isabella' })
  username: string;
  // TODO: ....................email
  @Prop({
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
    validate: [validateEmail, "este email no es correcto"],

  })
  @ApiProperty({ default: 'isabella@admin.com' })
  email: string;
  // TODO: ....................password
  @Prop({
    type: String,
    required: [true, "La contraseña es necesaria"],
    validate: [passwordV, 'debe tener mas de 7 digitos']
  })

  @ApiProperty({ default: '' })
  password: string;
  // TODO: .................... role 
  @Prop({
    type: String,
    required: true,
    default: "USUARIO",
    enum: rolesValidos,
  })
  @ApiProperty({ default: '' })
  role?: string;
  // TODO: .................... Token
  @ApiProperty({ default: '' })
  @Prop({
    type: String,
    default: null
  })
  token?: string;

  // TODO: .................... Estado
  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  @ApiProperty({ default: false })
  estado?: boolean;
  // TODO: .................... btcRelaciones
  @ApiProperty({ default: '' })
  _id?: string;
  @ApiProperty({ default: '' })
  password_compare?: string;
  id?: string
}

export const UserSchema = SchemaFactory.createForClass(User);

