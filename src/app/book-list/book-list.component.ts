import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books!: Book[];

  constructor(private bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.books = this.bs.getAll();
  }
}
