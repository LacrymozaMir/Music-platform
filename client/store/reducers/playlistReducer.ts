import { IPlaylist, PlaylistState } from "@/types/playlist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: PlaylistState = {
    playlists: [],
    errorPlaylists: '',
}

export const PlaylistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        fetchPlaylists(state, action: PayloadAction<IPlaylist[]>) {
            state.errorPlaylists = '',
            state.playlists = action.payload;
        },
        fetchPlaylistsError(state, action: PayloadAction<string>) {
            state.errorPlaylists = action.payload;
        },
    }
}) 

export default PlaylistSlice.reducer;