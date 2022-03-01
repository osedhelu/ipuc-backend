import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '@service/user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
            name: User.name, useFactory: () => {
                const schema = UserSchema;
                schema.plugin(require('mongoose-unique-validator'), {
                    message: "{PATH} debe de ser único",
                });
                return schema
            }
        }])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
