import { IUserList } from '@/types/userData';
import React from 'react'
import cl from "../styles/UserList.module.css"
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';
import { instance } from '@/api/axios.api';
import { toast } from 'react-toastify';
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper';
import axios from 'axios';

interface FriendListProps {
    users: IUserList[];
    getFriends: Function;
}

const FriendList: React.FC<FriendListProps> = ({users, getFriends}) => {

    const router = useRouter();

    const removeFriend = async (e: any, id: any) => {
        e.stopPropagation();
        const { data } = await axios({
            method: 'delete',
            url: 'http://localhost:5000/user/friend/' + id,
            headers: {
              Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
            }
          });
        getFriends();
        toast.success('Друг удалён :(')
    }

  return (
    <div className={cl.main__container}>
        <div className={cl.container}>
            <div className={cl.user_list}>
                {users.map(user => 
                    <div 
                        onClick={() => router.push('/profile/' + user._id)} 
                        className={cl.user_container}
                        key={user._id}
                    >
                        <div className={cl.user_name}>{user.name}</div>
                        <ClearIcon className={cl.delete_icon} onClick={e => removeFriend(e, user._id)}/>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default FriendList;
