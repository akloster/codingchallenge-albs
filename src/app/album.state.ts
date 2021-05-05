import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Album } from './album';
import { AlbumListComponent } from './album-list/album-list.component';
import {AlbumActions} from './album.actions'
export const API_ROOT= "https://hk-test-api.herokuapp.com/";

// This is the shape of our global state store
interface AlbsStateModel {
  albums: Album[]
}

// callAPI is a simple function to simplify invoking the API.
// It is not very sophisticated, but works for this demonstration.
async function callAPI(method:string, path:string, data?:any){
  let body = data === undefined ? undefined : JSON.stringify(data);
    var resp = await fetch(API_ROOT+path,
        {method:method,
          headers:{
            'X-API-Key':'secret',
            'Accept': 'application/json',
             'Content-Type': 'application/json'
        },
        body:body
      })
    try {
        return await resp.json();
    } catch (error) {return error}
}

@State<AlbsStateModel>({
  name: 'albs',
  defaults: {
    albums: []
  }
})

// This is where the Actions are implemented. The Actions mutate
// the state store via "patchState", in this app usually as a result
// of some API call.

// In the truest sense, this is the wrong way to implement State Reducers
// and async actions, because reducers should not be asynchronous and
// instead the actions should be split into subactions. Otherwise the
// application can be caught by network or API errors in between async
// calls, leading to an inconsistent state.
// But implementing such logic is complicated and was deemed beyond the
// scope of this exercise.

export class AlbsState {
  @Selector()
  static albums(state: AlbsStateModel): Album[] {
    return state.albums;
  }
  @Action(AlbumActions.Create)
  CreateAlbum(ctx: StateContext<AlbsStateModel>, action: AlbumActions.Create) {
        callAPI("POST", "/albums", action.album ).then((data)=>{
          if (data.status!=200){
            console.log("Error caught!!")
          } else {
            ctx.patchState({albums:[data ,...ctx.getState().albums]});
          }
      });
  }
  @Action(AlbumActions.Update)
  UpdateAlbum(ctx: StateContext<AlbsStateModel>, action: AlbumActions.Update) {
        callAPI("PUT", "/albums/"+action.album.id.toString(), action.album ).then((data)=>{
          if (data.status!=200){
            console.log("Error caught!!")
          } else {
            let albums =  ctx.getState().albums.map(album=>{
              if (album.id===action.album.id)
                return data;
              else return album
            });
            ctx.patchState({albums:albums});
          }
      });
  }
    @Action(AlbumActions.Load)
    LoadAlbums(ctx: StateContext<AlbsStateModel>, action: AlbumActions.Load) {
        callAPI("GET", "/albums/").then((data)=>{ctx.patchState({albums:data})});
    }

    @Action(AlbumActions.Delete)
    DeleteAlbums(ctx: StateContext<AlbsStateModel>, action: AlbumActions.Delete) {
        callAPI("DELETE", "/albums/"+action.id.toString()).then((data)=>{
              ctx.patchState({albums: ctx.getState().albums.filter((album)=>album.id!=action.id) }
          )});
    }
}