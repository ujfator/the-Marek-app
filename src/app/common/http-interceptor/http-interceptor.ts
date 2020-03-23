import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import notify from "devextreme/ui/notify";

@Injectable()
export class HttpCallsInterceptor implements HttpInterceptor {

	constructor(
		) {
		}

 	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap(evt => {
				if (evt instanceof HttpResponse) {}
			}),
			catchError((error: HttpErrorResponse) => {
					let errorMessage = '';
					if (error.error instanceof ErrorEvent) {
						// client-side error
						errorMessage = error.error.message;
					} else {
						// server-side error
						if (error && error.error) errorMessage = error.error.message;
					}
					notify({
						message: error.message,
						type: "error",
						displayTime: 3000,
						width: 450,
					});
					return throwError(errorMessage);


			})
		);
 	}
}
