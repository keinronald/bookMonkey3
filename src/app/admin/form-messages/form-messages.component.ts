import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.scss']
})
export class FormMessagesComponent implements OnInit {
  @Input() control!: AbstractControl | null;
  @Input() controlName!: string;

  private allMessages: { [index: string]: any } = {
    title: {
      required: 'Ein Buchtitel muss angegeben werden.'
    },
    isbn: {
      required: 'Es muss eine ISBN angegeben werden.',
      isbnFormat: 'Die ISBN muss aus 10 oder 13 Zeichen bestehen.',
      isbnExists: 'Die ISBN existiert bereits.',
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden.'
    },
    authors: {
      atLeastOneAuthor: 'Es muss ein Autor angegeben werden.'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  errorsForControl(): string[] | null {
    const messages = this.allMessages[this.controlName] || false;

    if (
      !this.control ||
      !this.control.errors ||
      !messages ||
      !this.control.dirty
    ) { return null; }

    return Object.keys(this.control.errors)
      .map(err => messages[err]);
  }
}

