import axios from "axios";
import { AppDispatch } from "..";
import { PlaylistSlice } from "../reducers/playlistReducer";

export const fetchPlaylists = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/playlists')
        dispatch(PlaylistSlice.actions.fetchPlaylists(response.data))
    } catch(e: any) {
        dispatch(PlaylistSlice.actions.fetchPlaylistsError(e.message))
    }
}

export const searchPlaylists = (query: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/playlists/search?query=' + query)
        dispatch(PlaylistSlice.actions.fetchPlaylists(response.data))
    } catch(e: any) {
        dispatch(PlaylistSlice.actions.fetchPlaylistsError(e.message))
    }
}
