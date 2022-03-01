import { Injectable, NestMiddleware } from '@nestjs/common';
import { eth_verify } from '@utils/eth-validate.utils';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ethMiddeleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    req.eth = eth_verify(req.body.token);
    next();
  }
}

