import { Observable } from 'rxjs';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AlbumListDataSource} from './album-list-datasource';
import {Album} from '../album';
import {AlbsState} from '../album.state';
import {Select, Store } from '@ngxs/store';
import {AlbumDeleteModalComponent} from '../album-delete-modal/album-delete-modal.component';
import {EditAlbumModalComponent} from '../edit-album-modal/edit-album-modal.component';
import { AlbumActions } from '../album.actions';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Album>;
  dataSource: AlbumListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['released_in', 'artist', 'title','actions'];

  @Select(AlbsState.albums)
  albums: Observable<Album[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.dataSource = new AlbumListDataSource(this.albums);
  }
  onDelete(album:Album){
    let dialogRef = this.dialog.open(AlbumDeleteModalComponent,
      {
        data:{album: album}
      });
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.store.dispatch(new AlbumActions.Delete(album.id));
      }
    })
  }
  onEdit(album:Album){
    let dialogRef = this.dialog.open(EditAlbumModalComponent,
      {
        data:{album: album},
        width: "600px"
      });
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.store.dispatch(new AlbumActions.Update(result));
      }
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
