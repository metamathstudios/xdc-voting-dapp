import VotersList from '../VotersList'
import About from './components/About'
import List from './components/List'
import Search from './components/Search'

import styles from './styles.module.scss'

const HomeComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerColumn}>
        <Search />
        <div className={styles.content}>
          <List />
          <About />
          <VotersList />
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
