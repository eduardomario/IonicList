import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/items-model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items: Item[] = [];
  constructor(
    private http: HttpClient
  ) { }

  saveItem(item: Item) {
    this.items.push(item);
  }
}
