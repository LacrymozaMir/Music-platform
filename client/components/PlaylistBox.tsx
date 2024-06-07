import { IPlaylist } from '@/types/playlist';
import React from 'react'
import cl from '../styles/PlaylistBox.module.css'
import { useRouter } from 'next/router';

interface PlaylistBoxProps {
    playlist: IPlaylist;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({playlist}) => {

    const router = useRouter();


  return (
    <div className={cl.main__container} onClick={() => router.push('/playlist/' + playlist._id)}>
        <div className={cl.container}>
            <div className={cl.cover}>
                <img className={cl.cover__img} src={'http://localhost:5000/' + playlist.picture}/>
            </div>
            <div className={cl.name}>
                {playlist.name}
            </div>
        </div>
    </div>
  )
}

export default PlaylistBox
