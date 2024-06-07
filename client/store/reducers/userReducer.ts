import { IUser } from "@/types/userData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: IUser | null,
    isAuth: boolean
}

const initialState: UserState = {
    user: null,
    isAuth: false,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.user = action.payload
            state.isAuth = true
            console.log(state.isAuth, state.user);
        },
        logUot(state) {
            state.isAuth = false
            state.user = null
        },

    },
})

export default UserSlice.reducer;