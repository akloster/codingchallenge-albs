import { Component, Inject, OnInit , ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-album-modal',
  templateUrl: './add-album-modal.component.html',
  styleUrls: ['./add-album-modal.component.sass']
})
export class AddAlbumModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}, public dialogRef: MatDialogRef<AddAlbumModalComponent>) { }
  @ViewChild('released_in') releasedIn: ElementRef;
  @ViewChild('artist') artist: ElementRef;
  @ViewChild('title') title: ElementRef;
  ngOnInit(): void {
  }
  closeDialog() {
  }
  getResult(){
    if (this.releasedIn===undefined) return{};
    return {
      'released_in': this.releasedIn.nativeElement.value,
      'artist': this.artist.nativeElement.value,
      'title': this.title.nativeElement.value
    }
  }
}
