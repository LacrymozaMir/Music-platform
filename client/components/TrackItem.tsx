import { ITrack } from '@/types/track';
import { Card, Grid, Icon, IconButton, ThemeProvider, createSvgIcon, createTheme } from '@mui/material';
import React from 'react'
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PauseOutlined, PlayArrow, PlayArrowOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { PlayerSlice } from '@/store/reducers/playerReducer';
import { useAppDispatch } from '@/hooks/redux';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { instance } from '@/api/axios.api';
import { toast } from 'react-toastify';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

export const themeWhite = createTheme({
    palette: {
      white: {
        main: '#DCDCDC',
      },
    },
  });

  export const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

const TrackItem: React.FC<TrackItemProps> = ({track, active=false}) => {

    const router = useRouter();
    const {PlayTrack, PauseTrack, SetActive} = PlayerSlice.actions;
    const dispatch = useAppDispatch();
    const isAuth = useAuth();

    const play = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(SetActive(track));
      dispatch(PlayTrack());
      listen(e);
      console.log(active);
    }

    const listen = (e: any) => {
      e.stopPropagation();
      const response = axios.post('http://localhost:5000/tracks/listen/' + track._id)
      .catch(e => console.log(e))
    }

    const addTrack = async (e: any) => {
      e.stopPropagation();
      const { data } = await axios({
        method: 'post',
        url: 'http://localhost:5000/user/addTrack/' + track._id,
        headers: {
          Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
        }
      });
      toast.success('Track was added!')
    }
    
    const globalDeleteTrack = (e: any) => {
      e.stopPropagation();
      const response = axios.delete('http://localhost:5000/tracks/' + track._id)
      .then(resp => router.push('/track'))
      .catch(e => console.log(e))
    }

  return (
    <Card className={styles.track} onClick={() => router.push('/track/' + track._id)}>
      <ThemeProvider theme={themeWhite}>
        <IconButton onClick={play}>
                {/* {active
                    ? <Pause color="white"/>
                    : <PlayArrow color="white"/>
                } */}
                {active &&
                  <Pause color="white"/>
                }
                {!active &&
                  <PlayArrow color="white"/>
                }
        </IconButton>
        <img className={styles.cover__img} src={'http://localhost:5000/' + track.picture}/>
        <Grid container direction="column" className={styles.track__text}>
            <div className={styles.trackName}>{track.name}</div>
            <div className={styles.trackArtist}>{track.artist}</div>
        </Grid>
        <div className={styles.listens_container}>
          <HeadphonesIcon fontSize='small' color='white' className={styles.listens_icon}/>
          <div className={styles.listens}>{track.listens}</div>
        </div>
          {isAuth &&
            <IconButton onClick={addTrack} style={{marginLeft: 'auto'}}>
              <PlusIcon className={styles.track_icon}  color='white'/>
            </IconButton>
          }
        </ThemeProvider>
    </Card>
  )
}

export default TrackItem;

