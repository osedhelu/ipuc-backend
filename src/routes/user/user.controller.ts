import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MessageResponse } from '@interfaces/httpResponse';
import { User } from './user.schema';
import { userCunsult } from '@interfaces/login.interface';
import { UserService } from 'src/service/user.service';
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _s: UserService) { }
  @Get()
  getUser() {
    return this._s.list();
  }
  @Post()
  async postUser(@Body() body: User): Promise<MessageResponse> {
    try {
      const data = await this._s.save(body)
      return {
        ok: true,
        data

      }
    } catch (e) {
      throw new HttpException(e, 400)
    }
  }
  // @Get('query/:username')
  // getUserInfo(@Param() params: userCunsult) {
  // return this._s.InfoForUser(params.username)
  // }
  @Post('login')
  async login(@Body() data: User): Promise<MessageResponse> {
    try {
      return {
        ok: true,
        data: []
      }
    } catch (e: any) {
      throw new HttpException(e.message, 400)
    }
  }
}