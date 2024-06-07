import { useAppSelector } from "./redux"

export const useAuth = (): boolean => {
    const isAuth = useAppSelector(state => state.userReducer.isAuth)

    return isAuth;
}