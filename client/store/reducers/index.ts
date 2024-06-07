import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer"
import trackReducer from "./trackReducer"
import { HYDRATE } from "next-redux-wrapper";
import userReducer from "./userReducer"
import playlistReducer from "./playlistReducer"
import getUserReducer from "./getUserReducer"

const rootReducer = combineReducers({
    playerReducer,
    trackReducer,
    userReducer,
    playlistReducer,
    getUserReducer,
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    } else {
      return rootReducer(state, action);
    }
  };

export type RootState = ReturnType<typeof rootReducer>
