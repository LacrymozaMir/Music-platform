import { IUser, IUserList } from "@/types/userData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    users: IUserList[],
    errorUsers: string
}

const initialState: UserState = {
    users: [],
    errorUsers: '',
}

export const GetUserSlice = createSlice({
    name: 'getUser',
    initialState,
    reducers: {
        fetchUsers(state, action: PayloadAction<IUserList[]>) {
            state.errorUsers = '',
            state.users = action.payload;
        },
        fetchUsersError(state, action: PayloadAction<string>) {
            state.errorUsers = action.payload;
        },

    },
})

export default GetUserSlice.reducer;