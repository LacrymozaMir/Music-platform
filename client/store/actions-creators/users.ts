import axios from "axios";
import { AppDispatch } from "..";
import { GetUserSlice } from "../reducers/getUserReducer";
import { getTokenFromLocalStorage } from "@/helpers/localstorage.helper";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/user/canFriend',
            headers: {
              Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
            },
          })
        dispatch(GetUserSlice.actions.fetchUsers(response.data))
        console.log(response.data)
    } catch(e: any) {
        dispatch(GetUserSlice.actions.fetchUsersError(e.message))
    }
}
