import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { __Controller } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { balance, BalanceSchema } from './schemas/balance.schema';
import { _balanceD, _BalanceDSchema } from './schemas/balanceDetails.schema';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: balance.name, useFactory: () => {
        const schema = BalanceSchema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }]),
    MongooseModule.forFeatureAsync([{
      name: _balanceD.name, useFactory: () => {
        const schema = _BalanceDSchema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }])
  ],
  controllers: [__Controller],
  providers: [AccountingService],
  exports: [AccountingService]
})
export class AccountingModule { }
