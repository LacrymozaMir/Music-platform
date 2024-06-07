import MainLayot from '@/layouts/MainLayot'
import React, { useEffect, useRef, useState } from 'react'
import cl from '../../styles/ChatPage.module.css'
import { instance } from '@/api/axios.api'
import { useAuth } from '@/hooks/useAuth'
import { IDialog } from '@/types/dialog'
import { useInput } from '@/hooks/useInput'
import { Button, TextField, ThemeProvider, createTheme } from '@mui/material'
import axios from 'axios'
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'
import { Send } from '@mui/icons-material'
import { useAppSelector } from '@/hooks/redux'
import * as moment from 'moment'; 

const theme = createTheme({
  palette: {
    white: {
      main: 'white',
      light: 'white',
      dark: 'white',
      contrastText: 'white'
    },
    black: {
      main: '#000000',
      light: '#696969',
      dark: '#000000',
      contrastText: 'white'
    }
  },
});

const index = () => {
  const [friends, setFriends] = useState([]);
  const [dialogs, setDialogs] = useState<IDialog[]>([]);
  const [activeDialog, setActiveDialog] = useState<IDialog | undefined>();
  const {user} = useAppSelector(state => state.userReducer)
  let temp = null;
  let tempUser = null;
  const text = useInput('');
  const ref = useRef(null);

  useEffect(()=> {
    getFriends();
    getDialogs();
  },[]);

  const getDate = (date: string) => {
    const newTime = moment(date);
    return newTime.format('LT');
  }

  const getName = (dialog: any) => {
    if (dialog.userOne[0]._id == user?.id){
      return dialog.userTwo[0].name;
    } else {
      return dialog.userOne[0].name;
    }
  }

  if (activeDialog?.userOne[0]._id == user?.id){
    temp = activeDialog?.userTwo[0]._id;
    tempUser = activeDialog?.userTwo[0].name;
  } else {
    temp = activeDialog?.userOne[0]._id;
    tempUser = activeDialog?.userOne[0].name;
  }

  const handleKeyPress = (e: any) => {
    if(e.key === 'Enter'){
      sendMessage();
    }
  };

  const scrollMessager = () => {
    if (ref.current != null){
      ref.current.scrollIntoView({ behavior: 'smooth'})
    } 
  }

  const sendMessage = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:5000/dialog/sendMessage/' + temp,
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      },
      data: {
        text: text.value,
      }
    })
    await changeActiveDialog(activeDialog?._id);
    text.setValue('');
  }

  const getDialogs = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/dialog',
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setDialogs(data);
  }

  const getFriends = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/user/friends',
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setFriends(data);
  }

  const changeActiveDialog = async (id: any) => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/dialog/' + id,
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setActiveDialog(data);
    await setTimeout(scrollMessager, 100);
  }

  return (
    <MainLayot>
      <div className={cl.main_container}>
        <div className={cl.container}>
          <div className={cl.friendlist}>
              <div className={cl.friendlist_header}>Ваши диалоги:</div>
              <div className={cl.friendlist_container}>
                {dialogs.map(dialog => 
                <div className={cl.friendlist_item} key={dialog._id} onClick={(e) => changeActiveDialog(dialog._id)}>{getName(dialog)}</div>
                  )}
              </div>
          </div>
          <div className={cl.vertical_line}></div>
          <div className={cl.dialog_container}>
            <div className={cl.dialog_header}>
              <span className={cl.dialog_header_text}>{tempUser}</span>
            </div>
            <div className={cl.dialog_messages}>
              <div className={cl.dialog}>
                {!activeDialog &&
                  <div className={cl.dialog_not}>Выберите диалог</div>
                }
                {activeDialog?.messages.map(mess => 
                    <div key={mess._id} className={cl.message_container} ref={ref}>
                      {mess.userOne[0] == temp &&
                        <div className={cl.enemy_message}>
                          {getDate(mess.mesTime)}
                          <span className={cl.mess_text}>{mess.text}</span>
                        </div>
                      } 
                      {mess.userOne[0] !== temp &&
                        <div className={cl.my_message}>
                          {getDate(mess.mesTime)}
                          <span className={cl.mess_text}>{mess.text}</span>
                        </div>
                      }
                    </div>
                  )}
              </div>
            </div>
            <ThemeProvider theme={theme}>
              <div className={cl.message_inp_container}>
                <TextField
                  {...text}
                  label={'Message'}
                  className={cl.mess_inp}
                  color='white'
                  onKeyPress={handleKeyPress}
                />
                <Send onClick={(e) => sendMessage()} fontSize='large' className={cl.message_btn}/>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </MainLayot>
  )
}

export default index;
