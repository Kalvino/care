import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

/**
 * Component is used as Modal
 * to crop the image passed in
 * from the PatientDetailsComponent
 */
@Component({
  selector: 'care-patient-image-crop',
  templateUrl: './patient-image-crop.component.html',
  styleUrls: ['./patient-image-crop.component.scss']
})
export class PatientImageCropComponent {
  /**
   * the base64 image from the camera
   */
  @Input() cameraImage: string;

  /**
   * the manipulated image
   */
  croppedImage;

  /**
   * constructor
   * @param {ModalController} modalCtrl
   */
  constructor(
    private modalCtrl: ModalController
  ) {
  }

  /**
   * on accept callback
   */
  onAccept() {
    this.modalCtrl.dismiss({
      croppedImage: this.croppedImage
    });
  }

  /**
   * callback when image has been croped
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /**
   * cancel modal
   */
  onCancel() {
    this.modalCtrl.dismiss({
      croppedImage: false
    });
  }
}
