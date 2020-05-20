import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/items-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private isLoading: Subject<boolean> = new Subject<boolean>();
  endpoint = 'https://supermarket-rest.herokuapp.com/test/pacreu';
  items: Item[] = [];
  constructor(
    private http: HttpClient
  ) { }

  saveItem(item: Item) {
    return this.http.post(this.endpoint, item);
  }

  getItem(id?: string) {
    if (id) {
      const url = `${this.endpoint}/${id}`;
      return this.http.get<any>(url);
    }
    return this.http.get<any>(this.endpoint);
  }

  updateItem(id: string, item: Item) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<any>(url, item);
  }

  deleteItem(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<any>(url);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  getIsLoading() {
    return this.isLoading.asObservable();
  }
}
