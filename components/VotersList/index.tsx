import React from 'react'
import styles from './styles.module.scss'

const VotersList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.votersContainer}>
        <div className={styles.label}>
          Voters
        </div>

        <div className={styles.totalVotes}>
          {30} Votes
        </div>
      </div>

      <div className={styles.userListContainer}>
        
      </div>

      <div className={styles.seeMoreContainer}>
        See more
      </div>
    </div>
  )
}

export default VotersList