import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book?: Book;

  constructor(
    public bs: BookStoreService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.book = this.bs.getSingle(params.get('isbn'));
  }

  getRating(num: number | undefined): any[] {
    return new Array(num);
  }
}
