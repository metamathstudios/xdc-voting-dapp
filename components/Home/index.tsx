import Searchbar from './components/Searchbar'

import styles from './styles.module.scss'

const HomeComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerColumn}>
        <Searchbar />
      </div>
    </div>
  )
}

export default HomeComponent