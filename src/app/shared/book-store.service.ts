import {Injectable} from '@angular/core';
import {Book} from './book';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BookRaw} from './book-raw';
import {catchError, map, retry} from 'rxjs/operators';
import {BookFactory} from './book-factory';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api3.angular-buch.com/secure';

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books`
    ).pipe(
      retry(3),
      map(booksRaw => {
        return booksRaw.map(b => BookFactory.fromRaw(b));
      }),
      catchError(this.errorHandler)
    );
  }


  getAllSearch(searchTerm: any): Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books/search/${searchTerm}`
    ).pipe(
      retry(3),
      map(booksRaw => {
        return booksRaw.map(b => BookFactory.fromRaw(b));
      }),
      catchError(this.errorHandler)
    );
  }

  getSingle(isbn: string | null): Observable<Book> {
    return this.http.get<BookRaw>(
      `${this.api}/book/${isbn}`
    ).pipe(
      retry(3),
      map(b => BookFactory.fromRaw(b)),
      catchError(this.errorHandler)
    );
  }

  remove(isbn: string | null): Observable<any> {
    return this.http.delete(
      `${this.api}/book/${isbn}`,
      {responseType: 'text'}
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }
}
