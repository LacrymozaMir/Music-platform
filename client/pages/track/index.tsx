import TrackList from '@/components/TrackList'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import MainLayot from '@/layouts/MainLayot'
import { wrapper } from '@/store'
import { fetchTracks, searchTracks } from '@/store/actions-creators/track'
import { Button, TextField, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import cl from '../../styles/trackPage.module.css'
import { useAuth } from '@/hooks/useAuth'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { theme } from '..'

const index = () => {

    const router = useRouter();
    const {tracks, error} = useAppSelector(state => state.trackReducer);
    const [query, setQuery] = useState<string>('');
    const dispatch = useAppDispatch();
    const [timer, setTimer] = useState(null);
    const isAuth = useAuth();

    const search = async (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout( async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        )
    }

   if (error) {
    return <MainLayot>
        <h1>{error}</h1>
    </MainLayot>
   }

  return (
        <MainLayot>
            <ThemeProvider theme={theme}>
            <div className={cl.main_container}>
                <div className={cl.container}>
                    <div className={cl.header_container}>
                        <h1 className={cl.header}>
                            Здесь вы можете найти и послушать все композиции, добавленные другими пользователями на нашей платформе
                        </h1>
                    </div>
                    <div className={cl.upload__container}>
                        <div className={cl.upload_text}>Загрузи свою композицию <PlayArrowIcon className={cl.upload_arrow} fontSize='large'/></div>
                            {isAuth && (
                                <Button color='black' variant="contained" className={cl.btn} onClick={() => router.push('/track/create')}>Загрузить</Button>
                            )}
                            {!isAuth && (
                                <Button color='black' variant="contained" className={cl.btn} onClick={() => router.push('/auth')}>Sign up</Button>
                            )}
                    </div>
                    <div className={cl.tracklist_container}>
                        <div className={cl.search_container}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Search"
                                    className={cl.search}
                                    placeholder='Do Re Mi'
                                    multiline
                                    value={query}
                                    onChange={search}
                                    color='white'
                                />
                        </div>
                        <TrackList tracks={tracks}/>
                    </div>
                </div>
            </div>
        </ThemeProvider>
        </MainLayot>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(await fetchTracks())
})


export default index;


