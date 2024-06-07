import MainLayot from '@/layouts/MainLayot'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import cl from '../../styles/Playlist.module.css'
import TrackList from '@/components/TrackList'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { PlusIcon } from '@/components/TrackItem'
import { instance } from '@/api/axios.api'
import { toast } from 'react-toastify'
import { theme } from '..'

const playlistPage = ({serverPlaylist}) => {

  const [playlist, setPlaylist] = useState(serverPlaylist)
  const router = useRouter();

  const addPlaylist = async (e: any) => {
    e.stopPropagation();
    const { data } = await instance.post('/user/addPlaylist/' + await playlist._id);
    toast.success('Track was added!')
  }


  return (
    <MainLayot>
      <ThemeProvider theme={theme}>
      <div className={cl.main__container}>
        <div className={cl.container}>
          <div className={cl.header__container}>
              <img className={cl.playlist_image} src={'http://localhost:5000/' + playlist.picture}/>
              <div className={cl.name}>{playlist.name}</div>
              <PlusIcon className={cl.playlist_icon} fontSize='large' onClick={addPlaylist}/>
          </div>
          <div className={cl.trackList}>
              <TrackList tracks={playlist.tracks}/>
          </div>
          <div className={cl.btn}>
              <Button color='black' size="large" variant="contained" onClick={() => router.push('/')}>Back</Button>
          </div>
        </div>
      </div>
      </ThemeProvider>
    </MainLayot>
  )
}

export const getServerSideProps: GetServerSideProps = async({params}) => {
    const response = await axios.get('http://localhost:5000/playlists/' + params?.id)
    return {
        props: {
            serverPlaylist: response.data
        }
    }
}

export default playlistPage
