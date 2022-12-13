import Image from 'next/image'

import styles from './styles.module.scss'

import less from './assets/less.svg'

const ImageInput = ({handleRenderNumber}) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Upload Document (Optional)
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <input type="text" />
        </div>

        <div className={styles.textButton}>
          <input type='file' />Browse File
        </div>

        <div className={styles.button} onClick={handleRenderNumber}>
          <Image src={less} alt='Add' className={styles.image} />
        </div>
      </div>
    </div>
  )
}

export default ImageInput