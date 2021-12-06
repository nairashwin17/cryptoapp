import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
      private activeRoute: ActivatedRoute,
      private router:Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with  token if available
        const dashShipmentToken = {
            apiKey:'410bf98a-d2e1-4d4b-893d-ceb93903105f'
        }
        const headers = {};
         headers['X-CMC_PRO_API_KEY'] = dashShipmentToken.apiKey;
         headers["Content-Type"] =  "application/x-www-form-urlencoded";
         headers['Access-Control-Allow-Origin'] =  '*';
        
        request = request.clone({
            setHeaders: headers
        });



        return next.handle(request);
    }
}
