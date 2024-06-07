import { IPlaylist } from '@/types/playlist';
import React from 'react'
import PlaylistBox from './PlaylistBox';
import cl from '../styles/PlaylistBoxListUser.module.css'


interface PlalistBoxListUserProps {
    playlists: IPlaylist[];
}

const PlaylistBoxListUser: React.FC<PlalistBoxListUserProps> = ({playlists}) => {
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

export default PlaylistBoxListUser
