import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import MainLayot from '@/layouts/MainLayot'
import React, { useEffect, useState } from 'react'
import cl from "../../styles/profile.module.css"
import { Box, Button, Modal, ThemeProvider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { instance } from '@/api/axios.api'
import { wrapper } from '@/store'
import FriendList from '@/components/FriendList'
import DoubleTrackListUser from '@/components/DoubleTrackList'
import PlaylistBoxListUser from '@/components/PlaylistBoxListUser'
import UserList from '@/components/UserList'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'
import { authService } from '@/services/auth.service'
import { UserSlice } from '@/store/reducers/userReducer'
import { theme } from '..'
import axios from 'axios'

  //Modal styles
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const index = () => {
  //Main
  const {user} = useAppSelector(state => state.userReducer);
  const router = useRouter();
  const [tracksUser, setTracksUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [canFriend, setCanFriend] = useState([]);
  const [reqFren, setReqFren] = useState([]);

  //Modal allUsers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Modal friend request
  const [openRF, setOpenRF] = React.useState(false);
  const handleOpenRF = () => setOpenRF(true);
  const handleCloseRF = () => setOpenRF(false);


  useEffect(()=> {
    getTracks();
    getFriends();
    getPlaylists();
    getCanFriend();
    getReqFren();
  },[])

  const getTracks = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/user/myTracks',
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setTracksUser(data);
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

  const getPlaylists = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/user/myPlaylists',
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setPlaylists(data);
  }

  const getCanFriend = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/user/canFriend',
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setCanFriend(data);
  }

  const getReqFren = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:5000/user/friends/requests',
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    setReqFren(data);
  }

  const acceptReq = async (e:any, id:any) => {
    e.stopPropagation();
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:5000/user/friend/accepts/' + id,
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    await getReqFren();
    await getFriends();
    await getCanFriend();
  }

  const rejectReq = async (e:any, id:any) => {
    e.stopPropagation();
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:5000/user/friend/reject/' + id,
      headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
      }
    });
    await getReqFren();
  }

  return (
    <MainLayot>
      <ThemeProvider theme={theme}>
        <div className={cl.main__container}>
          <div className={cl.container}>
            <div className={cl.header}>
              <h1 className={cl.header__name}>
                Услышь, {user?.name}!
              </h1>
            </div>
            <div className={cl.content}>
              <div className={cl.container__tracks}>
                  <div className={cl.wall__tracks}>
                    <div className={cl.wall__header_container}>
                      <h3 className={cl.wall__header}>Добавленные треки</h3>
                      <Button color='white' size="large" variant="outlined" onClick={() => router.push('/track/create')} className={cl.btn}>Загрузить</Button>
                    </div>
                    <div className={cl.trackList}>
                      <DoubleTrackListUser deleteTrack={getTracks} tracks={tracksUser}/>
                    </div>
                  </div>

                  <div className={cl.wall__playlist}>
                    <div className={cl.wall__header_container}>
                        <h3 className={cl.wall__header}>Добавленные плейлисты</h3>
                        <Button color='white' size="large" variant="outlined" className={cl.btn}>Создать</Button>
                    </div>
                    <div className={cl.playlistS}>
                        <PlaylistBoxListUser playlists={playlists}/>
                    </div>
                  </div>
              </div>
              <div className={cl.container__friends}>
                <div className={cl.friend_header_container}>
                  <div className={cl.friend_header}>Друзья:</div>
                  <PersonAddIcon onClick={handleOpen} className={cl.friend_header_icon} fontSize="large"/>
                  {/* Modal */}
                  <div> 
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography className={cl.modal_header} id="modal-modal-title" variant="h6" component="h2">
                          Выберите пользователей, которых хотели бы добавить
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <UserList add={getCanFriend} users={canFriend}/>
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </div>
                  <Button onClick={handleOpenRF} color='white' size="large" variant="outlined" className={cl.btn}>Входящие заявки</Button>
                {/* Modal */}
                <div> 
                    <Modal
                      open={openRF}
                      onClose={handleCloseRF}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography className={cl.modal_header} id="modal-modal-title" variant="h6" component="h2">
                          Входящие заявки в друзья
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={cl.req_friends_container}>
                          {reqFren?.map(req => 
                              <div className={cl.req_friends_container}>
                                <div className={cl.req_friends_name}>{req.sender[0]?.name}</div>
                                <CheckIcon className={cl.req_friends_icon_accept} onClick={(e) => acceptReq(e, req._id)}/>
                                <ClearIcon className={cl.req_friends_icon_reject} onClick={(e) => rejectReq(e, req._id)}/>
                              </div>
                            )}
                        </div>
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                <FriendList getFriends={getFriends} users={friends}/>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </MainLayot>
      
  )
}

export default index
