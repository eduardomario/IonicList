import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../models/items-model';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items: Item[] = [];
  constructor(
    private router: Router,
    private itemService: ItemsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.itemService.setIsLoading(true);
    this.itemService.getItem().subscribe(resp => {
      console.log(resp);
      this.itemService.setIsLoading(false);
      this.items = resp;
    }, err => {
      this.itemService.setIsLoading(false);
      console.error(err);
    });
  }

  newItem() {
    this.router.navigate(['item']);
  }

  editItem(id: string) {
    this.router.navigate(['item'], { queryParams: { id } });
  }

}
