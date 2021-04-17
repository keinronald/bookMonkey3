import { Injectable } from '@angular/core';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  books!: Book[];

  constructor() {
    this.books = [
      {
        isbn: '987654321',
        title: 'Angular',
        authors: ['Author 1', 'Author 2', 'Author 3'],
        published: new Date(2019, 4, 30),
        subtitle: 'Grundlagen, fortgeschrittene THemen und Best Practices - mit NativeScritp und NgRx',
        rating: 5,
        thumbnails: [{
          url: 'https://ng-buch.de/buch1.jpg',
          title: 'Buchcover'
        }],
        description: 'Die Authoren führen Sie ...',
      },
      {
        isbn: '123456789',
        title: 'React',
        authors: ['Author 1', 'Author 2', 'Author 3'],
        published: new Date(2019, 4, 30),
        subtitle: 'Die praktische Einführung in React',
        rating: 5,
        thumbnails: [{
          url: 'https://ng-buch.de/buch2.jpg',
          title: 'Buchcover'
        }],
        description: 'Die Authoren führen Sie ...',
      },
    ];
  }

  getAll(): Book[] {
    return this.books;
  }
}
