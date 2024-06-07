import { ITrack, TrackState } from "@/types/track"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: TrackState = {
    tracks: [],
    error: '',
}

export const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        fetchTracks(state, action: PayloadAction<ITrack[]>) {
            state.error = '',
            state.tracks = action.payload;
        },
        fetchTracksError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    }
}) 

export default trackSlice.reducer;