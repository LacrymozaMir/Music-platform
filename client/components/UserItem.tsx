import React, { useState } from 'react'
import cl from "../styles/UserItem.module.css"
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { IUserList } from '@/types/userData';
import { instance } from '@/api/axios.api';
import { ThemeProvider } from '@emotion/react';
import { PlusIcon, themeWhite } from './TrackItem';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper';


interface UserItemProps {
    user: IUserList;
    add: Function
}

const UserItem: React.FC<UserItemProps> = ({user, add}) => {
    const router = useRouter();
    const isAuth = useAuth();

    const addFriend = async (e: any) => {
        e.stopPropagation();
        const { data } = await axios({
            method: 'post',
            url: 'http://localhost:5000/user/friends/' + user._id,
            headers: {
              Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
            }
          });
        add();
    }


  return (
    <div className={cl.main}>
        <div className={cl.username} onClick={() => router.push('/profile/' + user._id)}>
            {user.name}
        </div>
        <ThemeProvider theme={themeWhite}>
            {isAuth &&
                <IconButton style={{marginLeft: 'auto'}}>
                    <PlusIcon onClick={addFriend} color='white'/>
                </IconButton>
            }
        </ThemeProvider>
    </div>
  )
}

export default UserItem
