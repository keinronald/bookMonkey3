import {Component, OnInit, Output, EventEmitter, ViewChild, Input, OnChanges} from '@angular/core';
import {Book, Thumbnail} from '../shared/book';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnChanges {
  bookForm!: FormGroup;

  @Input() book!: Book;
  @Input() editing = false;

  @Output() submitButton = new EventEmitter<Book>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm();
    this.setFormValues(this.book);
  }

  submitForm(): void {
    const formValue = this.bookForm.value;

    const authors = formValue.authors.filter((author: string) => author);
    const thumbnails = formValue.thumbnails.filter((thumbnail: Thumbnail) => thumbnail.url);
    const isbn = this.editing ? this.book.isbn : formValue.isbn;

    const newBook: Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    };

    this.submitButton.emit(newBook);
    this.bookForm.reset();
  }

  addAuthorControl(): void {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl(): void {
    this.thumbnails.push(this.fb.group({
      url: '',
      title: '',
    }));
  }

  private initForm(): void {
    if (this.bookForm) {
      return;
    }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{value: '', disabled: this.editing}, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([
        { title: '', url: '' }
      ]),
      published: []
    });
  }

  private setFormValues(book: Book): void {
    this.bookForm.patchValue(book);

    this.bookForm.setControl(
      'authors',
      this.buildAuthorsArray(book.authors)
    );

    this.bookForm.setControl(
      'thumbnails',
      this.buildThumbnailsArray(book.thumbnails)
    );
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  private buildThumbnailsArray(values: Thumbnail[] | undefined): FormArray {
    return this.fb.array(
      values ? values.map(t => this.fb.group(t)) : []
    );
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

}
