import { Request, Response, NextFunction } from 'express';
import * as clsHooked from 'cls-hooked';
import { assign } from 'lodash';

interface ApplicationMiddlewareOptions {
  name: string;
  domain: string;
}

export function ApplicationMiddleware(options: ApplicationMiddlewareOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clsNamespace = clsHooked.createNamespace(options.name);
    await clsNamespace.run(async () => {
      if (options.domain) {
        // check domain from req on production
        console.log(`Request from: ` + options.domain);
        clsNamespace.set(options.name, options.domain);
        assign(req, {
          applicationName: options.name,
          applicationDomain: options.domain,
        });
      }
      next();
    });
  };
}
