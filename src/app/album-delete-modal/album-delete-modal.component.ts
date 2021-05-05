import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Album} from '../album';

@Component({
  selector: 'app-album-delete-modal',
  templateUrl: './album-delete-modal.component.html',
  styleUrls: ['./album-delete-modal.component.sass']
})
export class AlbumDeleteModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {album:Album}) { }

  ngOnInit(): void {
  }

}
