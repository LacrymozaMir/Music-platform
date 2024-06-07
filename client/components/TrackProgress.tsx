import React, { ChangeEventHandler } from 'react'
import styles from '../styles/TrackProgress.module.css'

interface TrackProgressProps{
    left: number;
    right: number;
    onChange: ChangeEventHandler;
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
  return (
    <div className={styles.container}>
      <input 
        type="range" 
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        className={styles.propgress}
      />
      <div>{left} / {right}</div>
    </div>
  )
}

export default TrackProgress;
