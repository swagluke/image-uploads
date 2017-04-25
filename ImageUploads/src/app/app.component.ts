import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

interface FeaturedPhotoUrls {
  url1?: string;
  url2?: string;
}

interface Photo {
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public featuredPhotoStream: FirebaseObjectObservable<FeaturedPhotoUrls>;
  public photoListStream: FirebaseListObservable<Photo[]>;
  constructor(private af: AngularFire) {
    this.featuredPhotoStream = this.af.database.object("/photos/featured");
    this.photoListStream = this.af.database.list("/photos/list");
  }

  // featuredPhotoSelected(event: MSInputMethodContext) {
  //   const target: HTMLInputElement = <HTMLInputElement>event.target;
  //   const files: FileList = target.files;
  //   const file: File = files[0];
  // }
  featuredPhotoSelected(event: any, photoName: string) {
    const file: File = event.target.files[0]
    console.log("Selected File", file);

    const metadata = { "content-type": file.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref().child("photos").child("featured").child(photoName);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metadata);
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log("Upload is complete");
      const downloadUrl = uploadSnapshot.downloadURL;
      firebase.database().ref().child(`/photos/featured/${photoName}`).set(downloadUrl);
      // this.featuredPhotoStream.update({url1: downloadUrl});
    });
    storageRef.put(file, metadata);
    console.log("Uploading", file.name);
  }

  triggerInput1(inputEl) {
    inputEl.click();
    //  document.getElementById("featuredPhoto1Input").click();
  }

  photoSelectedForList(event: any) {
    const nextAvailableKey = firebase.database().ref().child(`/photos/list`).push({}).key;
    const file: File = event.target.files[0]
    console.log("Selected File", file);
    const metadata = { "content-type": file.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref().child("photos").child("list").child(nextAvailableKey);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metadata);
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log("Upload is complete");
      const downloadUrl = uploadSnapshot.downloadURL;
      const newPhoto: Photo = {url: downloadUrl}
      firebase.database().ref().child(`/photos/list/${nextAvailableKey}`).set(newPhoto);
      // this.featuredPhotoStream.update({url1: downloadUrl});
    });
    console.log("Uploading", file.name);
  }

}
