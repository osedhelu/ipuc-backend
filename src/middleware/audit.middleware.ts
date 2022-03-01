import { NestMiddleware } from "@nestjs/common";
import { Request } from 'express-serve-static-core'
import { Response } from 'express'
export class AuditMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const hash = req.headers.authorization;
        const token1 = hash.split(" ")[1];
        const b = new Buffer(token1, "base64");
        // const { token, id } = JSON.parse(b.toString());

        // next()
    }
}