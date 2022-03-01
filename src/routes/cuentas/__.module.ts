import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountingModule } from '@routes/accounting/accounting.module';
import { __Controller } from './__.controller';
import { Accounts, AccountsSchema } from './__.schema';
import { AccountService } from './__.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Accounts.name, useFactory: () => {
        const schema = AccountsSchema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }]),
    forwardRef(() => AccountingModule),

  ],
  controllers: [__Controller],
  providers: [AccountService]
})
export class AccountModule { }
