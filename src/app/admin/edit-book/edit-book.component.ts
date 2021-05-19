import { Component, OnInit } from '@angular/core';
import {Book} from '../../shared/book';
import {BookStoreService} from '../../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  book$!: Observable<Book>;

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn') as string),
      switchMap((isbn: string) => this.bs.getSingle(isbn))
    );
  }

  updateBook(book: Book): void {
    this.bs.update(book).subscribe(() => {
      this.router.navigate(
        ['../../..', 'books', book.isbn],
          {relativeTo: this.route}
      );
    });
  }
}
