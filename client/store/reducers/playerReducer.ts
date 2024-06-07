import { PlayerAction, PlayerActionTypes, PlayerState, SetCurrentTimeAction } from "@/types/player";
import { ITrack } from "@/types/track";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    pause: true,
    volume: 50,
}


export const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        PauseTrack(state: PlayerState) {
            state.pause = true;
        },
        PlayTrack(state: PlayerState) {
            state.pause = false;
        },
        SetCurrentTime(state: PlayerState, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        SetVolume(state: PlayerState, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        SetDuration(state: PlayerState, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        SetActive(state: PlayerState, action: PayloadAction<ITrack | null>) {
            state.active = action.payload, state.duration = 0, state.currentTime = 0;
        },
    }
})

export default PlayerSlice.reducer;