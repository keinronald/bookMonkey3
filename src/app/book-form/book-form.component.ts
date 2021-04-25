import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {BookFactory} from '../shared/book-factory';
import {Book} from '../shared/book';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  book = BookFactory.empty();

  @Output() submitButton = new EventEmitter<Book>();
  @ViewChild('bookForm') bookForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.submitButton.emit(this.book);

    this.book = BookFactory.empty();
    this.bookForm.reset();
  }
}
