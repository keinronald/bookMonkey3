import {Component, OnInit} from '@angular/core';
import {Book} from '../../shared/book';
import {BookStoreService} from '../../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<Book>;

  constructor(
    private bs: BookStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.book$ = this.bs.getSingle(params.get('isbn'));
  }

  getRating(num: number | undefined): any[] {
    return new Array(num);
  }

  removeBook(isbn: string): void {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(isbn)
        .subscribe(
          () => this.router.navigate(
            ['../'],
            {relativeTo: this.route})
        );
    }
  }
}
