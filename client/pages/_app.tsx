import React, { FC } from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import { wrapper } from '@/store';
import "../styles/app.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
      <ToastContainer position='bottom-left' autoClose={2000}/>
    </Provider>
  );
};

export default MyApp;