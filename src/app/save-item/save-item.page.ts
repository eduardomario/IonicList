import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../services/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../models/items-model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
    private itemService: ItemsService,
    private route: ActivatedRoute,
    private camera: Camera
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)])
      ],
      quantity: [null, Validators.compose([
        Validators.required,
        Validators.min(1),
      ])],
      image: [null]
    });

    this.itemId = '';

    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.itemService.setIsLoading(true);
        this.itemService.getItem(params.id).subscribe(resp => {
          this.itemService.setIsLoading(false);
          this.itemId = resp._id;
          this.itemForm.controls.title.setValue(resp.title);
          this.itemForm.controls.quantity.setValue(resp.quantity);
          this.itemForm.controls.image.setValue(resp.image);
        });
      }
  });
  }

  ngOnInit() {
  }

  save() {
    if (this.itemForm.controls.image.value || this.itemForm.controls.image.value !== null) {
      this.itemForm.controls.image.setValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBRQRMB8ZME7NAAABuklEQVRIx6XVv2vTQRzG8VfCN2nS1CgtGm3RwUVBXAQr2gqCW6VQoYM/BlEEl06K4KBL/wwHSyhYQRwK4qBCFSyipSgR4yClHRwUhFLQRpuUONgGKfGb5JtnOTg+9777PNxzR5uKbYw5mRZX/vRtE3DVuO1+twhIWXbHPS5aNCDe8tnjBi05z3tDutxwSRyBK65JghFjukIhZ7xjTY+7XvjsMm76YN44Rnzx0mQooMdaIKEsp6Aih16flPRirwWvDIQCyhJUZR3w2IQsdntk2j50mTTjSCggq/oXEFVZ1QDTKhEBAQEmlCIC0k613ULrF2iLGgNOO9Qe4JbD4QX1PYgZlUDMsv0SRmu53eJBfUDKlII0DvouplPBlFSzJvZ4qttJJfR7o2rVCRkzcs140GdOwZAVcNQc+OGsea/1NQasq+iozfd7W6vsULHejIndZjy3A0m/7ALbPDFrZ7MmJuUVdeq3ADKK8hvPTFMAGBYYMwUCw3VrGsY577owbcT5/3pmVkO1ncayRGRAQjmu6FhkwHEfuWDRQN2ohCtm0JJzgfs6PYzwtXVYcduDzZ33SLcIWPU1cuv/6g/ay3A3X3i0JAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNS0yMFQxNzo0ODozMSswMDowMI2go4AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDUtMjBUMTc6NDg6MzErMDA6MDD8/Rs8AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==');
    }
    this.itemService.setIsLoading(true);
    if (this.itemId) {
      this.itemService.updateItem(this.itemId, this.itemForm.value).subscribe(resp => {
        this.itemService.setIsLoading(false);
        this.router.navigate(['list']);
      }, err => {
        this.itemService.setIsLoading(false);
        console.error(err);
      });
    } else {
      this.itemService.saveItem(this.itemForm.value).subscribe(resp => {
        console.log(resp);
        this.itemService.setIsLoading(false);
        this.router.navigate(['list']);
      }, err => {
        this.itemService.setIsLoading(false);
        console.error(err);
      });
    }
  }

  deleteItem() {
    this.itemService.setIsLoading(true);
    if (this.itemId) {
      this.itemService.deleteItem(this.itemId).subscribe(resp => {
        console.log(resp);
        this.itemService.setIsLoading(false);
        this.router.navigate(['list'], { replaceUrl: true });
      }, err => {
        this.itemService.setIsLoading(false);
        console.error(err);
      });
    }
  }

  addPicture() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('Picture', base64Image);
      this.itemForm.controls.image.setValue(base64Image);
    }, (err) => {
      alert('Error al tomar la foto');
    });
  }

}
