import styles from './styles.module.scss'

type data = {
  name: string,
  date: string
}

const UserRow = ({name, date}: data) => {
  return (
    <>
    <div className={styles.line} />
      <div className={styles.container}>
        <div className={styles.userContainer}>
          <div className={styles.profile}>
            
          </div>
        
          <div className={styles.name}>
            {name}
          </div>
        </div>

        <div className={styles.dateContainer}>
          {date} ago
        </div>
      </div>
    </>
  )
}

export default UserRow