import MainLayot from '@/layouts/MainLayot'
import { Button, Grid, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import { useInput } from '@/hooks/useInput'
import axios from 'axios'
import { useRouter } from 'next/router'
import cl from '../../styles/CreateTrack.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { theme } from '..'

const create = () => {

    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter()

    const upload = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('text', text.value)
        formData.append('artist', artist.value)
        formData.append('picture', picture)
        formData.append('audio', audio)
        axios.post('http://localhost:5000/tracks', formData)
            .then(resp => router.push('/'))
            .catch(e => console.log(e))
        
    }
    const back = () => {
        router.push('/')
    }

  return (
    <MainLayot>
        <ThemeProvider theme={theme}>
        <div className={cl.container}>
            <div className={cl.container__second}>
                <h1 className={cl.header}>Поделись своей композицией с другими пользователями</h1>
                <Grid container direction={"column"} >
                    <TextField
                        {...name}
                        className={cl.inp}
                        label={'Название композиции'}
                        color='white'
                    />
                    <TextField
                        {...artist}
                        className={cl.inp}
                        label={'Автор композиции'}
                        color='white'
                    />
                    <FileUpload setFile={setPicture} accept='image/*'>
                            <Button color="black" className={cl.btn} component="label" startIcon={<CloudUploadIcon />} variant="contained">Обложка</Button>
                    </FileUpload>
                    <FileUpload setFile={setAudio} accept='audio/*'>
                            <Button color="black" className={cl.btn} component="label" startIcon={<CloudUploadIcon />} variant="contained">Аудиофайл</Button>
                    </FileUpload>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Button className={cl.btn_move} color="black" variant="contained" onClick={back}>Назад</Button>
                    <Button className={cl.btn_move} color="black" variant="contained" onClick={upload}>Загрузить</Button>
                </Grid>
            </div>
        </div>
        </ThemeProvider>
    </MainLayot>
  )
}

export default create
