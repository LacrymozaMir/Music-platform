import { ITrack } from '@/types/track';
import { Card, Grid, Icon, IconButton, ThemeProvider, createSvgIcon, createTheme } from '@mui/material';
import React from 'react'
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PauseOutlined, PlayArrow, PlayArrowOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { PlayerSlice } from '@/store/reducers/playerReducer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { instance } from '@/api/axios.api';
import { toast } from 'react-toastify';
import { request } from 'http';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
    deleteTrack: Function;
}

export const themeWhite = createTheme({
    palette: {
      white: {
        main: '#DCDCDC',
      },
    },
  });

const PlusIcon = createSvgIcon(
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

const TrackItemUser: React.FC<TrackItemProps> = ({track, active=false, deleteTrack}) => {

    const router = useRouter();
    const {PlayTrack, PauseTrack, SetActive} = PlayerSlice.actions;
    const dispatch = useAppDispatch();
    const isAuth = useAuth();

    const play = (e: any) => {
      e.stopPropagation();
      dispatch(SetActive(track));
      dispatch(PlayTrack());
    }

    const deletTrackFromProlife = async (e:any) => {
      e.stopPropagation();
      const response = await instance.delete('/user/myTracks/' + track._id);
      toast.success('Композиция удалена!')
      deleteTrack();
    }

  return (
    <Card className={styles.track} onClick={() => router.push('/track/' + track._id)}>
        <IconButton onClick={play}>
            <ThemeProvider theme={themeWhite}>
                {active
                    ? <Pause color="white"/>
                    : <PlayArrow color="white"/>
                }
            </ThemeProvider>
        </IconButton>
        <img className={styles.cover__img} src={'http://localhost:5000/' + track.picture}/>
        <Grid container direction="column" className={styles.track__text}>
            <div className={styles.trackName}>{track.name}</div>
            <div className={styles.trackArtist}>{track.artist}</div>
        </Grid>
        {active && <div>Fuck</div>}
        <ThemeProvider theme={themeWhite}>
          <IconButton onClick={deletTrackFromProlife} style={{marginLeft: 'auto'}}>
              <Delete color='white'/>
          </IconButton>
        </ThemeProvider>
    </Card>
  )
}

export default TrackItemUser;

