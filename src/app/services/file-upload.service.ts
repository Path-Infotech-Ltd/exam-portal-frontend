import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  alertService: any;
  apiUrl:any='';
  constructor(private http: HttpClient) { }
  public upload(formData) {
    return this.http.post(`${baseUrl}/api/csv/uploadCategories`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
      // observe: 'response'
      
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
		break;
      case HttpEventType.Response:
        return this.apiResponse(event);
		break;
      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }
  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }



  uploadFile(file: File, jobName: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('jobName', jobName);
    this.apiUrl= `${baseUrl}/fileController/fileUpload`;
    const req = new HttpRequest('POST', this.apiUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorEvent => {
        if (errorEvent.status === 400) {
          this.alertService.error(errorEvent.error['image']);
        } else {
          this.alertService.error('Server Error, Please try again later!');
          return Observable.throw(errorEvent);
        }
        return Observable.throw(errorEvent);
      }));
  }

  public uploadProfilePicture(uploadFile:any){
    return this.http.post(`${baseUrl}/fileController/fileUpload`, uploadFile, { observe: 'response' });
  }


}
