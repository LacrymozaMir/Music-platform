import MainLayot from '@/layouts/MainLayot';
import React, { useState } from 'react'
import cl from '../../styles/Auth.module.css'
import { authService } from '@/services/auth.service';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { UserSlice } from '@/store/reducers/userReducer';
import { useRouter } from 'next/router';
import { Button, TextField, ThemeProvider } from '@mui/material';
import { theme } from '..';

const index = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState<Boolean>(false);
    const {login, logUot} = UserSlice.actions;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
           e.preventDefault()
           const data = await authService.login({name, password})

           if(data){
            setTokenToLocalStorage('token', await data.token)
            dispatch(login(data))
            toast.success('You logged in!')
            router.push('/');
           }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const registationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await authService.registation({name, password});
            if(data) {
                toast.success('OK');
                setIsLogin(!isLogin);
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }
    return (
      <MainLayot>
      <div className={cl.main__container}>
        <div className={cl.container_app}>
          <div className={cl.logo_container}>
            <h1 className={cl.background_text}>Присоединись к миру музыки</h1>
          </div>
          <div className={cl.container}>
            <h1 className={cl.header_container}>
                {isLogin ? <span className={cl.header}>Регистрация</span> : <span className={cl.header}>Логин</span>}
            </h1>
            <ThemeProvider theme={theme}>
              <form className={cl.auth__form} onSubmit={isLogin ? registationHandler : loginHandler}>
                <TextField color='white' variant="standard" onChange={(e) => setName(e.target.value)} className={cl.inp} type='text' placeholder='Имя пользователя'/>
                <TextField color='white' variant="standard" onChange={(e) => setPassword(e.target.value)} className={cl.inp} type='password' placeholder='Ваш пароль'/>
                <Button type="submit" color='black' variant="contained" className={cl.btn}>Music</Button>
              </form>
            </ThemeProvider>
            <div className={cl.footer__btn}>
              { isLogin ? 
                (<div onClick={() => setIsLogin(!isLogin)}>Уже есть аккаунт?</div>)
                :
                (<div onClick={() => setIsLogin(!isLogin)}>У вас нет аккаунта?</div>)
              }
            </div>
          </div> 
        </div>
      </div>
      </MainLayot>
  )
}

export default index
