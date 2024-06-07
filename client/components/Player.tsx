import { Pause, PlayArrow, VolumeDown, VolumeUp } from '@mui/icons-material'
import { Button, Grid, IconButton, Slider, ThemeProvider, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import styles from '../styles/Player.module.scss'
import TrackProgress from './TrackProgress'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { PlayerSlice } from '@/store/reducers/playerReducer'
import { ITrack } from '@/types/track'
import TrackVolume from './TrackVolume'
import { themeWhite } from './TrackItem'

let audio: any;

const Player = () => {
    const {pause, volume, active, duration, currentTime} = useAppSelector(state => state.playerReducer)
    const {PlayTrack, PauseTrack, SetActive, SetCurrentTime, SetDuration, SetVolume} = PlayerSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!audio) {
        audio = new Audio();
      } else {
        setAudio();
        play();
      }
    }, [active])

    const setAudio = () => {
      if (active) {
        audio.src = 'http://localhost:5000/' + active.audio;
        audio.volume = volume / 100;
        audio.onloadedmetadata = () => {
          dispatch(SetDuration(Math.ceil(audio.duration)));
        }
        audio.ontimeupdate = () => {
          dispatch(SetCurrentTime(Math.ceil(audio.currentTime)));
        }
      }
    }

    const play = () => {
      if (pause) {
        dispatch(PlayTrack())
        console.log(active);
        audio.play();
      } else {
        dispatch(PauseTrack())
        audio.pause();
      }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100;
      dispatch(SetVolume(Number(e.target.value)))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = Number(e.target.value);
      dispatch(SetCurrentTime(Number(e.target.value)))
    }
    
    const stopPlayer = () => {
      dispatch(SetActive(null));
    }

    if (!active) {
      return null;
    }


    function formatDuration(value: number) {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    

  return (
    <div className={styles.player__container}>
      <div className={styles.player}>
        <ThemeProvider theme={themeWhite}>
          <IconButton onClick={play} className={styles.btns}>
              {!pause
                  ? <Pause size="large" color='white'/>
                  : <PlayArrow size="large" color='white'/>
              }
          </IconButton>
        </ThemeProvider>
          <Grid className={styles.name_artist_txt} container direction="column" style={{width: 200, margin: '0 20px'}}>
              <div className={styles.trackName}>{active?.name}</div>
              <div className={styles.trackArtist}>{active?.artist}</div>
          </Grid>
          <div className={styles.track__time}>{formatDuration(currentTime)} / {formatDuration(duration)}</div>
          <ThemeProvider theme={themeWhite}>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={currentTime}
              min={0}
              step={1}
              max={duration}
              onChange={changeCurrentTime}
              color='white'
              className={styles.track_progress}
              />
              <div className={styles.track__volume__container}>
                <VolumeUp className={styles.track__volume__icon}/>
                <Slider 
                  style={{width: 100}}
                  aria-label="Volume" 
                  size="small"
                  value={volume} 
                  onChange={changeVolume}
                  color="white"
                  className={styles.track__volume__bar}
                 />
              </div>
          </ThemeProvider>
      </div>
    </div>
  )
}

export default Player;
