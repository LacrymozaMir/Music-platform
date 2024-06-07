import { ITrack } from '@/types/track'
import { Box, Grid } from '@mui/material';
import React from 'react'
import cl from '../styles/DoubleTrackList.module.css'
import TrackItemUser from './TrackItemUser';

interface DoubleTrackListProps {
    tracks: ITrack[];
    deleteTrack: Function
}

const DoubleTrackListUser: React.FC<DoubleTrackListProps> = ({tracks, deleteTrack}) => {
  return (
    <Grid className={cl.main__container} container direction="column">
        <Box p={1} className={cl.track__container}>
            {tracks.map(track =>
              <TrackItemUser
                  key={track._id}
                  track={track}
                  deleteTrack={deleteTrack}
              />
              )}
        </Box>
    </Grid>
  )
}

export default DoubleTrackListUser;
