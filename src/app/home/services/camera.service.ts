import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

/**
 * Service for taking pictures with the camera
 */
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  /**
   * default camera options
   * Check out Ionic Native Camera docs.
   * You can override the default settings by passing
   * an object into the 'takePhoto' function
   */
  private options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  /**
   * constructor
   * {Camera} camera
   */
  constructor(
    private camera: Camera,
    private base64: Base64
  ) {
  }

  /**
   * take a photo with the camera
   */
  takePhoto(): Promise<any> {
    return this.camera.getPicture(this.options);
  }

  /**
   * take a photo from the gallery
   */
  takeFromGallery(): Promise<any> {
    const galleryOptions = {
      ...this.options,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    return this.camera.getPicture(galleryOptions);
  }

  /**
   * convert a file into base64 encoded data
   * @param filePath
   */
  base64FromFile(filePath): Promise<any> {
    return this.base64.encodeFile(filePath);
  }
}
