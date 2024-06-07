import MainLayot from '@/layouts/MainLayot';
import { ThemeProvider } from '@mui/material';
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import cl from "../../styles/UserProfile.module.css"
import DoubleTrackListUser from '@/components/DoubleTrackList';
import PlaylistBoxListUser from '@/components/PlaylistBoxListUser';
import { theme } from '..';

const userProfile = ({serverUser}) => {
  const [user, setUser] = useState(serverUser);

  return (
    <MainLayot>
        <div className={cl.main__container}>
          <div className={cl.container}>
            <ThemeProvider theme={theme}>
                <div className={cl.header}>
                    <h1 className={cl.header__name}>
                        {user?.name}!
                    </h1>
                </div>
                <div className={cl.content}>
                  <div className={cl.container__tracks}>
                    <div className={cl.wall__header_container}>
                      <h3 className={cl.wall__header}>Добавленные треки</h3>
                    </div>
                    <div className={cl.trackList}>
                      <DoubleTrackListUser tracks={user.addedTracks}/>
                    </div>
                  </div> 
                  <div className={cl.wall__playlist}>
                    <div className={cl.wall__header_container}>
                      <h3 className={cl.wall__header}>Добавленные плейлисты</h3>
                    </div>
                    <div className={cl.playlistS}>
                      <PlaylistBoxListUser playlists={user.addedPlaylists}/>
                    </div>
                  </div>   
                </div>
              </ThemeProvider>
            </div>
        </div>
    </MainLayot>
  )
}

export const getServerSideProps: GetServerSideProps = async({params}) => {
    const response = await axios.get('http://localhost:5000/user/getOne/' + params?.id)
    return {
        props: {
            serverUser: response.data
        }
    }
}

export default userProfile;
