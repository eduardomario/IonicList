import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveItemPage } from './save-item.page';

describe('SaveItemPage', () => {
  let component: SaveItemPage;
  let fixture: ComponentFixture<SaveItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
