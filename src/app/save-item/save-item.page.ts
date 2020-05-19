import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-save-item',
  templateUrl: './save-item.page.html',
  styleUrls: ['./save-item.page.scss'],
})
export class SaveItemPage implements OnInit {

  itemForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _item: ItemsService
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
  }

  ngOnInit() {
  }

  save() {
    this._item.saveItem(this.itemForm.value);
  }

}
