import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-item',
  templateUrl: './save-item.page.html',
  styleUrls: ['./save-item.page.scss'],
})
export class SaveItemPage implements OnInit {

  itemForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)])
      ],
      price: [null, Validators.compose([
        Validators.required,
        Validators.min(1),
      ])]
    });
  }

  ngOnInit() {
  }

}
