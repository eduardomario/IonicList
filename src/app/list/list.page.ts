import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  listForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.listForm = this.fb.group({
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
