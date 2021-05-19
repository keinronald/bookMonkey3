import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../shared/book';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createBook(book: Book): void {
    this.bs.create(book).subscribe(() => {
      this.router.navigate(['../..', 'books'], {relativeTo: this.route});
    });
  }
}
