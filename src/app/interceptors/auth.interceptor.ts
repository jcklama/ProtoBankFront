import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('id_token');
    if (authToken) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      })
      // ALTERNATIVELY:
      // const tokenizedReq = req.clone({
      // setHeaders: {
      //  Authorization: 'Bearer xx.yy.zz'
      // }
      // })

      return next.handle(tokenizedReq);

    } else {
      return next.handle(req);
    }
  }

}

