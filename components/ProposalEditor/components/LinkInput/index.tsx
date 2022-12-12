import Image from 'next/image'

import styles from './styles.module.scss'

import more from './assets/more.svg'

const LinkInput = () => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Link (Optional)
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <input type="text" />
        </div>

        <div className={styles.button}>
          <Image src={more} alt='Add' className={styles.image} />
        </div>
      </div>
    </div>
  )
}

export default LinkInput