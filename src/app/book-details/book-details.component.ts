import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Book} from '../shared/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  @Input() book!: Book;
  @Output() showListEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  getRating(num: number | undefined): any[] {
    return new Array(num);
  }

  showBookList(): void {
    this.showListEvent.emit();
  }
}
