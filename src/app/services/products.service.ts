import { Injectable } from '@angular/core';
import { IProduct } from '../domain/iproduct';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // NOTE : This in new in ANGULAR 6 !
})
export class ProductsService {
  // private _productUrl = './assets/api/products/products.json';
  private _productUrl = 'http://localhost:3000/products';
  constructor(private _http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
      return this._http.get<IProduct[]>(this._productUrl)
         // .map((response: Response) => <IProduct[]> response.json())  // No more needed since 4.3
         // .do(data => console.log('All: ' +  JSON.stringify(data))) // Regarder ici https://alligator.io/angular/angular-6/
        .pipe(
          tap(data => console.log('All: ' +  data)),
          catchError(this.handleError<IProduct[]>('Get All Products', []))
        );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      return of(result as T);  // Let the app keep running by returning an empty result.
    };
  }


}
