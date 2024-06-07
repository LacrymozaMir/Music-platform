import { instance } from '@/api/axios.api'
import { IUserData, IResponseUserData, IUser } from '../types/userData'
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'
import axios from 'axios'


export const authService = {
    async registation(userData: IUserData): Promise<IResponseUserData | undefined> {
        const {data} = await instance.post<IResponseUserData>('user', userData)
        return data
    },
    async login(userData: IUserData): Promise<IUser | undefined> {
        const { data } = await instance.post<IUser>('/auth/login', userData)
        return data
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await axios({
            method: 'get',
            url: 'http://localhost:5000/auth/profile',
            headers: {
              Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
            },
        })
        if(data) return data
    },
}