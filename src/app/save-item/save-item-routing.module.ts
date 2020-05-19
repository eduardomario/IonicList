import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveItemPage } from './save-item.page';

const routes: Routes = [
  {
    path: '',
    component: SaveItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveItemPageRoutingModule {}
