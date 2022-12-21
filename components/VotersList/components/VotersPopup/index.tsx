import Image from 'next/image'

import styles from './styles.module.scss'

import close from './assets/close.svg'
import UserRow from '../UserRow'
import { useState } from 'react'

const maxItems = 9
const maxLeft = (maxItems - 1) / 2

type pagination = {
  limit: number,
  total: number,
  offset: number,
  setOffset: any,
  activePopup: any,
  setActivePopup: any
}

const VotersPopup = ({limit, total, offset, setOffset, activePopup, setActivePopup}:pagination) => {
  const current = offset ? (offset / limit) + 1 : 1
  const pages = Math.ceil(total / limit)
  const first = Math.max(current - maxLeft, 1)

  return (
    <div className={styles.container}>
      <div className={styles.centralizePopup}>
        <div className={styles.popupContainer}>
          <div className={styles.closeContainer}>
            <Image src={close} alt='Close' onClick={() => setActivePopup(false)} style={{cursor: 'pointer'}}/>
          </div>

          <div className={styles.votersContainer}>
            <span>
              Voters
            </span>

            <div>
              {30} Votes
            </div>
          </div>

          <div className={styles.dataContainer}>
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
            <UserRow date='08 hours' name='jaumdarkz.xdc' />
          </div>
          
          <div className={styles.list}>
            <ul>
              {Array.from({ length: Math.min(maxItems, pages)})
              .map((_, index) => index + first)
              .map((page) => (
                <li key={page}>
                  <div onClick={() => setOffset((page - 1) * limit)} className={page === current ? styles.activeButton : styles.disabledButton}>
                    {page}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VotersPopup