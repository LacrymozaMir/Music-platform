import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import MainLayot from '@/layouts/MainLayot'
import { wrapper } from '@/store'
import { Button, TextField, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import cl from '../../styles/PlaylistPage.module.css'
import { useAuth } from '@/hooks/useAuth'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistBoxList from '@/components/PlaylistBoxList'
import { fetchPlaylists, searchPlaylists } from '@/store/actions-creators/playlist'
import { theme } from '..'

const index = () => {

    const router = useRouter();
    const {playlists, errorPlaylists} = useAppSelector(state => state.playlistReducer);
    const [query, setQuery] = useState<string>('');
    const dispatch = useAppDispatch();
    const isAuth = useAuth();
    const [timer, setTimer] = useState(null);

    const search = async (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout( async () => {
                await dispatch(await searchPlaylists(e.target.value));
            }, 500)
        )
    }

   if (errorPlaylists) {
    return <MainLayot>
        <h1>{errorPlaylists}</h1>
    </MainLayot>
   }

  return (
        <MainLayot>
            <div className={cl.main_container}>
            <ThemeProvider theme={theme}>
                <div className={cl.container}>
                    <div className={cl.header_container}>
                        <h1 className={cl.header}>
                            Поделись своим сочетанием песен с другими или послушай уже созданные
                        </h1>
                    </div>
                    <div className={cl.create__container}>
                        <div className={cl.create_text}> 
                            Создай свой плейлист 
                            <PlayArrowIcon className={cl.create_arrow} fontSize='large'/>
                        </div>
                            {isAuth && (
                                <Button color='black' variant="contained" className={cl.btn} onClick={() => router.push('/playlist/create')}>Create</Button>
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
                        <PlaylistBoxList playlists={playlists}/>
                    </div>
                </div>
                </ThemeProvider>
            </div>
        </MainLayot>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(await fetchPlaylists());
  })


export default index;


