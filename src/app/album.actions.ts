import { Album } from './album';
export namespace AlbumActions{
    export class Create {
    static readonly type = "[Album] Create Album";
        constructor(public album: Album) {
        }
    }
    export class Update {
    static readonly type = "[Album] Update Album";
        constructor(public album: Album) {
        }
    }
    export class Load {
    static readonly type = "[Album] Load Albums";
        constructor() {
        }
    }
    export class Delete {
    static readonly type = "[Album] Delete Album";
        constructor(public id:number) {
        }
    }
}