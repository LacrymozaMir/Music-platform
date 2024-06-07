import { IUserList } from '@/types/userData';
import React from 'react'
import cl from "../styles/UserList.module.css"
import UserItem from './UserItem';

interface UserListProps {
    users: IUserList[];
    add: Function;
}

const UserList: React.FC<UserListProps> = ({users, add}) => {
  return (
    <div className={cl.main__container}>
        <div className={cl.container}>
            <div className={cl.user_list}>
                {users.map(user => 
                    <UserItem
                        key={user.id}
                        user={user}
                        add={add}
                    />
                )}
            </div>
        </div>
    </div>
  )
}

export default UserList;
