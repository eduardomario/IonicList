import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../services/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../models/items-model';

@Component({
  selector: 'app-save-item',
  templateUrl: './save-item.page.html',
  styleUrls: ['./save-item.page.scss'],
})
export class SaveItemPage implements OnInit {

  itemForm: FormGroup;
  itemId: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _item: ItemsService,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)])
      ],
      quantity: [null, Validators.compose([
        Validators.required,
        Validators.min(1),
      ])]
    });

    this.itemId = '';

    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this._item.getItem(params.id).subscribe(resp => {
          this.itemId = resp._id;
          this.itemForm.controls.title.setValue(resp.title);
          this.itemForm.controls.quantity.setValue(resp.quantity);
        });
      }
  });
  }

  ngOnInit() {
  }

  save() {
    if (this.itemId) {
      const item: Item = {
        _id: this.itemId,
        title: this.itemForm.controls.title.value,
        quantity: this.itemForm.controls.quantity.value
      };
      this._item.updateItem(this.itemId, this.itemForm.value).subscribe(resp => {
        this.router.navigate(['list']);
      }, err => {
        console.error(err);
      });
    } else {
      this._item.saveItem(this.itemForm.value).subscribe(resp => {
        console.log(resp);
        this.router.navigate(['list']);
      }, err => {
        console.error(err);
      });
    }
  }

  deleteItem() {
    if (this.itemId) {
      this._item.deleteItem(this.itemId).subscribe(resp => {
        console.log(resp);
        this.router.navigate(['list'], { replaceUrl: true });
      }, err => {
        console.error(err);
      });
    }
  }

}
