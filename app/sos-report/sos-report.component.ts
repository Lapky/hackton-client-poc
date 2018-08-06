import { Component } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Mediafilepicker, MediaFilepickerOptions } from 'nativescript-mediafilepicker';
const imageSourceModule = require("tns-core-modules/image-source");
const fileSystemModule = require("tns-core-modules/file-system");

@Component({
  selector: 'sos-report',
  templateUrl: './sos-report/sos-report.component.html',
  styleUrls: ['./sos-report/sos-report.component.css'],
  providers: []
})
export class SosReportComponent {
  public pictureFromCamera: string;
  private mediafilepicker : Mediafilepicker; 

  constructor() {
    this.mediafilepicker = new Mediafilepicker();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }  
  
  takePicture() {
    let options: MediaFilepickerOptions = {
      android: {
          mxcount: 2,
          enableImagePicker: true,
          enableVideoPicker: false,
          enableCameraSupport: true,
      },
      ios: {
          allowsMultipleSelection: false,
          title: "Album",
          showCameraButton: true,
      }
  };
  this.mediafilepicker.on("getFiles", function (res: any) {
      let files = res.files;

      if (files.length > 0) {
          files = files.split(",");

          files.forEach(file => {
              const imageFromLocalFile = imageSourceModule.fromFile(file);

              console.log("imageFromLocalFile", imageFromLocalFile)
         
              this.pictureFromCamera = JSON.stringify(imageFromLocalFile);
          });
      } else {
          console.log("There was some problem to select the file. Looks like user has cancel it.")
      }

  })
  this.mediafilepicker.startFilePicker(options);
  }
}