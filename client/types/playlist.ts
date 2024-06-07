import { ITrack } from "./track";

export interface IPlaylist{
    _id: string;
    name: string;
    tracks: ITrack[];
    picture: string;
}

export interface PlaylistState {
    playlists: IPlaylist[];
    errorPlaylists: string;
}