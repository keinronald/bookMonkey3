import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  keyUp$ = new Subject<string>();
  isLoading = false;
  foundBooks: Book[] = [];

  constructor(
    private bs: BookStoreService
  ) {
  }

  ngOnInit(): void {
    this.keyUp$
      .pipe(
        filter(term => term.length >= 3),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
        tap(() => this.isLoading = false)
      )
      .subscribe(books => this.foundBooks = books);
  }

  ngOnDestroy(): void {
    this.keyUp$.unsubscribe();
  }
}
