import { IPlaylist } from '@/types/playlist';
import React from 'react'
import PlaylistBox from './PlaylistBox';
import cl from '../styles/PlaylistBoxList.module.css'


interface PlalistBoxListProps {
    playlists: IPlaylist[];
}

const PlaylistBoxList: React.FC<PlalistBoxListProps> = ({playlists}) => {
  return (
    <div className={cl.main__container}>
        <div className={cl.container}>
            {playlists.map(playlist =>
                <PlaylistBox
                key={playlist._id}
                playlist={playlist}
                />
            )}
        </div>
    </div>
  )
}

export default PlaylistBoxList
