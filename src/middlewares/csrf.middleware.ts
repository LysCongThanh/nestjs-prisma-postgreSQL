import { NestMiddleware } from '@nestjs/common';
import * as csurf from 'csurf';
import { Request, Response } from 'express';

export class CsrfMiddleware implements NestMiddleware {
  private csrfProtection = csurf({ cookie: true });

  use(req: Request, res: Response, next: () => void) {
    return this.csrfProtection(req, res, next);
  }
}
