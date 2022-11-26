import Image from 'next/image'

import styles from './styles.module.scss'

import search from '../../../../public/assets/svgicons/search.svg'

const Searchbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Image src={search} alt='Search' />
      </div>

      <div className={styles.input}>
        <input type="text" placeholder='Search'/>
      </div>
    </div>
  )
}

export default Searchbar