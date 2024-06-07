import { ITrack } from '@/types/track'
import { Box, Grid } from '@mui/material';
import React from 'react'
import cl from '../styles/TrackListUser.module.css'
import TrackItemUser from './TrackItemUser';

interface TrackListProps {
    tracks: ITrack[];
}

const TrackListUser: React.FC<TrackListProps> = ({tracks}) => {
  return (
    <Grid className={cl.main__container} container direction="column">
        <Box p={1} className={cl.track__container}>
            {tracks.map(track =>
                <TrackItemUser
                    key={track._id}
                    track={track}
                />
                )}
        </Box>
    </Grid>
  )
}

export default TrackListUser;
