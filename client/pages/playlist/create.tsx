import { useInput } from '@/hooks/useInput';
import MainLayot from '@/layouts/MainLayot';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import cl from '../../styles/CreatePlaylist.module.css'
import { Autocomplete, Button, Checkbox, Grid, TextField } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { wrapper } from '@/store';
import { fetchTracks } from '@/store/actions-creators/track';
import { useAppSelector } from '@/hooks/redux';
import axios from 'axios';
import FileUpload from '@/components/FileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ITrack } from '@/types/track';
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper';
import { theme } from '..';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const create = () => {
    const [picture, setPicture] = useState(null);
    const {tracks, error} = useAppSelector(state => state.trackReducer);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const name = useInput('');
    const router = useRouter();

    // const temp: ObjectId[] = [];

    // function test(arr: ITrack[]){
    //   arr.map(track => 
    //     temp.push(track._id)
    //   );
    // }

    const upload = async () => {
        // await test(await selectedTracks);
        axios({
          method: 'post',
          url: 'http://localhost:5000/playlists',
          headers: {
            Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
          },
          data: {
            name: name.value,
            picture: picture,
            tracks: selectedTracks,
          }
        })
        // await router.push('/');
    }

  return (
    <MainLayot>
      <ThemeProvider theme={theme}>
        <div className={cl.main__container}>
            <div className={cl.container}>
                <div className={cl.header_container}>
                  <h1 className={cl.header}>Создай свой плейлист</h1>
                </div>
                <Grid container direction={"column"} >
                      <TextField
                          {...name}
                          className={cl.inp}
                          label={'Название'}
                          color='white'
                      />
                  <Autocomplete
                    className={cl.inp}
                    multiple
                    id="checkboxes-tags-demo"
                    options={tracks}
                    value={selectedTracks}
                    onChange={(event: any, newValue: ITrack[] | null) => {
                      setSelectedTracks(newValue);
                    }}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} color='white' label="Выберите аудиотреки" placeholder="Добавить" />
                    )}
                  />
                  <FileUpload setFile={setPicture} accept='image/*'>
                    <Button color="black" className={cl.btn} component="label" startIcon={<CloudUploadIcon/>} variant="contained">Обложка плейлиста</Button>
                  </FileUpload>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Button className={cl.btn_move} color="black" variant="contained" onClick={() => router.push('/')}>Назад</Button>
                    <Button className={cl.btn_move} color="black" variant="contained" onClick={upload}>Создать</Button>
                </Grid>
            </div>
        </div>
        </ThemeProvider>
    </MainLayot>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(await fetchTracks())
})

export default create
