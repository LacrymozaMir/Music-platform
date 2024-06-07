import axios from "axios";
import { trackSlice } from "../reducers/trackReducer";
import { AppDispatch } from "..";

export const fetchTracks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/tracks')
        dispatch(trackSlice.actions.fetchTracks(response.data))
    } catch(e: any) {
        dispatch(trackSlice.actions.fetchTracksError(e.message))
    }
}

export const searchTracks = (query: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
        dispatch(trackSlice.actions.fetchTracks(response.data))
    } catch(e: any) {
        dispatch(trackSlice.actions.fetchTracksError(e.message))
    }
}