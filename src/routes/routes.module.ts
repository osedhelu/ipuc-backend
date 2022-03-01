import { Module, } from '@nestjs/common';
import { PackageModule } from './package/package.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PaisesModule } from './paises/paises.module';
import { AccountModule } from './cuentas/__.module';
import { CarteraModule } from './carteras/carteras.module';
import { AccountingModule } from './accounting/accounting.module'
// import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    PackageModule,
    CarteraModule,
    UserModule,
    AuthModule,
    AccountModule,
    ConfigModule.forRoot(),
    PaisesModule,
    AccountingModule
  ],
})
export class routesModule {

}
