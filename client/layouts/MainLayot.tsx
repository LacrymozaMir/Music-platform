import Navbar from '@/components/Navbar';
import Player from '@/components/Player';
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper';
import { useAppDispatch } from '@/hooks/redux';
import { authService } from '@/services/auth.service';
import { wrapper } from '@/store';
import { UserSlice } from '@/store/reducers/userReducer';
import React, { FC, useEffect } from 'react'
import { Provider } from 'react-redux';

type Props = {
    children?: React.ReactNode
};

const MainLayot: FC<Props> = ({children, ...rest}) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {login, logUot} = UserSlice.actions;
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await authService.getProfile();
        if(data) {
          dispatch(login(data))
        } else {
          dispatch(logUot())
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
    <Provider store={store}>
      <Navbar/>
      <div style={{width: '100%'}}>
        {children}
      </div>
      <Player/>
    </Provider>
    </>
  )
}

export default MainLayot;
