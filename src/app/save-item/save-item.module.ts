import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveItemPageRoutingModule } from './save-item-routing.module';

import { SaveItemPage } from './save-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SaveItemPageRoutingModule
  ],
  declarations: [SaveItemPage]
})
export class SaveItemPageModule {}
