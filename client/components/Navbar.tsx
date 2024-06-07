import * as React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import cl from "../styles/Navbar.module.css"
import { ThemeProvider, createTheme } from '@mui/material';
import note from "../img/bas.png"
import logo from "../img/logo.png"
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { UserSlice } from '@/store/reducers/userReducer';
import { removeTokenFromLocalStorage } from '@/helpers/localstorage.helper';
import { toast } from 'react-toastify';
import { theme } from '@/pages';

export default function Navbar() {
  const router = useRouter()
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const {login, logUot} = UserSlice.actions;
  const {user} = useAppSelector(state => state.userReducer)

  const logoutHandler = async () => {
    dispatch(logUot());
    removeTokenFromLocalStorage('token')
    toast.success('you logged out!')
    router.push('/');
  }

  return (
    <div>
      <div className={cl.navbar}>
        <div className={cl.navbar__items}>
          <ThemeProvider theme={theme}>
            <div onClick={() => router.push('/')}  className={cl.nav__logo}>
              <img className={cl.logo__img} src={logo.src}/>
            </div>
            <div className={cl.nav__btns}>
              <Button className={cl.btn} color="white" size="medium" onClick={() => router.push('/track')}>Композиции</Button>
              <Button className={cl.btn} color="white" size="medium" onClick={() => router.push('/playlist')}>Плейлисты</Button>
              <Button className={cl.btn} color="white" size="medium" onClick={() => router.push('/chat')}>Общение</Button>
              <img className={cl.nav__img} src={note.src}/>
              {isAuth && (
                <div>
                  <Button className={cl.btn} color="white" size="medium" onClick={logoutHandler}>Выйти</Button>
                  <Button className={cl.btn} color="white" size="medium" onClick={() => router.push('/profile')}>{user?.name}</Button>
                </div>
              )}
              {!isAuth && (
                <div>
                    <Button className={cl.btn} color="white" size="medium" onClick={() => router.push('/auth')}>Sign up</Button>
                    <Button className={cl.btn} color="white" size="medium" onClick={() => router.push('/auth')}>Log in</Button>
                </div>
              )}
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

