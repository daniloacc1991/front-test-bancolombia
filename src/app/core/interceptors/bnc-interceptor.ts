import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class BncInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set('x-rapidapi-key', '12fe6a327fmshfc181b47c53c4d2p163694jsnbe11eaa4bddb') });
    req = req.clone({ headers: req.headers.set('x-rapidapi-host', 'bravenewcoin.p.rapidapi.com') });
    req = req.clone({ headers: req.headers.set('useQueryString', 'true') });
    return next.handle(req).pipe(catchError((err: any) => {
      return throwError(err);
    }));
  }
}
