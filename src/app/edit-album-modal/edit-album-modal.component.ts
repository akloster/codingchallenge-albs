import { Component, Inject, OnInit , ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Album} from '../album';

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.sass']
})
export class EditAlbumModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {album:Album}, public dialogRef: MatDialogRef<EditAlbumModalComponent>) { }
  @ViewChild('released_in') releasedIn: ElementRef;
  @ViewChild('artist') artist: ElementRef;
  @ViewChild('title') title: ElementRef;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.releasedIn.nativeElement.value = this.data.album.released_in;
    this.artist.nativeElement.value = this.data.album.artist;
    this.title.nativeElement.value = this.data.album.title;
  }
  getResult(){
    if (this.releasedIn===undefined) return{};
    return {
      'id': this.data.album.id,
      'released_in': this.releasedIn.nativeElement.value,
      'artist': this.artist.nativeElement.value,
      'title': this.title.nativeElement.value
    }
  }
}
