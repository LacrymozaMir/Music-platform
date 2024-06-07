import { ITrack } from '@/types/track'
import { Box, Grid } from '@mui/material';
import React from 'react'
import TrackItem from './TrackItem';
import cl from '../styles/TrackList.module.css'

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
  return (
    <Grid className={cl.main__container} container direction="column">
        <Box p={2} className={cl.track__container}>
            {tracks.map(track =>
                <TrackItem
                    key={track._id}
                    track={track}
                />
                )}
        </Box>
    </Grid>
  )
}

export default TrackList;
