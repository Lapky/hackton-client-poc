import { Component, ViewChild, ElementRef } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Mediafilepicker, MediaFilepickerOptions } from 'nativescript-mediafilepicker';
import * as imageSourceModule from "tns-core-modules/image-source";
import { Image } from '../../node_modules/tns-core-modules/ui/image/image';

@Component({
    selector: 'picture-picker',
    templateUrl: './picture-picker/picture-picker.component.html',
    styleUrls: ['./picture-picker/picture-picker.component.css'],
    providers: []
})
export class PicturePickerComponent {
    private mediafilepicker: Mediafilepicker;
    @ViewChild("selectedImage") selectedImageRef: ElementRef;
    public selectedImageSource;

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
                mxcount: 1,
                enableImagePicker: true,
                enableVideoPicker: false,
                enableCameraSupport: true,
            }
        };
        var self = this;

        this.mediafilepicker.on("getFiles", function (res: any) {
            let files = res.files;

            if (files.length > 0) {
                files = files.split(",");
                var file = files[0];
                var imageSource = imageSourceModule.fromFile(file);
                var base64 = imageSource.toBase64String("png");

                let selectedImage = <Image>self.selectedImageRef.nativeElement;
                selectedImage.src = null;
                selectedImage.imageSource = imageSource;
                self.selectedImageSource = imageSource;
            } else {
                console.log("There was some problem to select the file. Looks like user has cancel it.")
            }
        })
        this.mediafilepicker.startFilePicker(options);
    }
}