import Image from 'next/image'
import { useState } from 'react'

import styles from './styles.module.scss'

import logo from '../../public/assets/logo/votinglogo.svg'
import moon from '../../public/assets/darkmode/moon.svg'
import sun from '../../public/assets/lightmode/sun.svg'

const Navbar = () => {
  //false == light | true == dark
  const [light, setLight] = useState(false)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.limitedContainer}>
          <div className={styles.logo}>
            <Image src={logo} alt='Logo' />
          </div>

          <div className={styles.userOptions}>
            <div className={styles.connectButton}>
              Connect Wallet
            </div>

            <div className={light == false ? styles.lightMode : styles.darkMode} onClick={() => setLight(!light)}>
              <div className={styles.limitWidth}>
                <Image src={light == false ? moon : sun} alt='Switch' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.line} />
    </>
  )
}

export default Navbar