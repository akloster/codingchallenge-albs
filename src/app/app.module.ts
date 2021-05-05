import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import {AlbsState} from './album.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DataTablesModule } from "angular-datatables";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AddAlbumModalComponent } from './add-album-modal/add-album-modal.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlbumDeleteModalComponent } from './album-delete-modal/album-delete-modal.component';
import { EditAlbumModalComponent } from './edit-album-modal/edit-album-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAlbumModalComponent,
    AlbumListComponent,
    AlbumDeleteModalComponent,
    EditAlbumModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    DataTablesModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    NgxsModule.forRoot([AlbsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  entryComponents: [AddAlbumModalComponent, AddAlbumModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
