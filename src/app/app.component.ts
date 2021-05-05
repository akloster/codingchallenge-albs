import { Component , ViewChild, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Album } from './album';
import { AlbsState } from './album.state';
import { AlbumActions } from './album.actions';
import { Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddAlbumModalComponent} from './add-album-modal/add-album-modal.component'
import { AlbumListComponent } from './album-list/album-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'albs';
  @Select(AlbsState.albums)
  albums: Observable<Album[]>;
  @ViewChild(AlbumListComponent) albumList!: AlbumListComponent; 
  constructor(private store: Store, private dialog: MatDialog) {}
  ngOnInit(){
  }
  ngAfterViewInit(): void {
    // Initial loading of Album store
    this.store.dispatch(new AlbumActions.Load()).subscribe(()=>{
      this.albums.subscribe((data)=>{
    });
  })
  }
  ngOnDestroy(): void {
  }
  clickAdd (){
           //this.store.dispatch(new AlbumActions.Create())
           let dialogRef = this.dialog.open(AddAlbumModalComponent, {
            height: '400px',
            width: '600px',
            hasBackdrop: true
          });
          dialogRef.afterClosed().subscribe(result=>{
            if (result){
              this.store.dispatch(new AlbumActions.Create({
                'released_in': result.released_in,
                'title': result.title,
                'artist': result.artist
              }))
            }
          })
        }
}
