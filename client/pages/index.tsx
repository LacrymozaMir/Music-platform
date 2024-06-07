import MainLayot from '@/layouts/MainLayot'
import React, { useEffect, useState } from 'react'
import cl from "../styles/index.module.css"
import background_img from '../img/main_background.jpg'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import TrackList from '@/components/TrackList'
import { useAppSelector } from '@/hooks/redux'
import { wrapper } from '@/store'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { fetchPlaylists } from '@/store/actions-creators/playlist'
import PlaylistBoxList from '@/components/PlaylistBoxList'
import axios from 'axios'


export const theme = createTheme({
  palette: {
    white: {
      main: '#FFFAFA',
      light: '#FFFFFF',
      dark: '#C0C0C0',
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

  const {playlists} = useAppSelector(state => state.playlistReducer);
  const router = useRouter();
  const isAuth = useAuth();
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    const { data } = await axios.get('http://localhost:5000/tracks/sort');
    setTracks(data);
  }

  useEffect(() => {
    getTracks();
  }, [])

  return (
    <MainLayot>
        <div className={cl.main}>
          <div className={cl.logo_container}>
            <img className={cl.background_img} src={background_img.src}/>
            <div className={cl.background_text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tempore!</div>
            <ThemeProvider theme={theme}>
              {!isAuth && (
                <Button 
                  color='black' 
                  size="large" 
                  variant="contained" 
                  className={cl.btn} 
                  onClick={() => router.push('/auth')}
                >
                  Sign up
                </Button>
              )}
            </ThemeProvider>
          </div>
          <div className={cl.content_1}>
            <div className={cl.content_2}>
              <div className={cl.tracklist_container}>
                <h1 className={cl.tracklist_header}>Самые прослушиваемые треки</h1>
                <TrackList tracks={tracks}/>
              </div>
              <div className={cl.vertical_line}></div>
              <div className={cl.playlists_container}>
                <h1 className={cl.playlists_header}>Новые альбомы</h1>
                <PlaylistBoxList playlists={playlists}/>
              </div>
            </div>
          </div>
        </div>
    </MainLayot>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(await fetchPlaylists());
})

export default index
