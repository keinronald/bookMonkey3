import {Injectable} from '@angular/core';
import {Book} from './book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api3.angular-buch.com';

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<any[]>(`${this.api}/books`);
  }

  getSingle(isbn: string | null): Observable<Book> {
    return this.http.get<any>(`${this.api}/book/${isbn}`);
  }

  remove(isbn: string | null): Observable<any> {
    return this.http.delete(
      `${this.api}/book/${isbn}`,
      {responseType: 'text'}
    );

  }
}
