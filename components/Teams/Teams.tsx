import Image from 'next/image'
import styles from './Teams.module.scss'

function Teams(): JSX.Element {
  return (
    <div className={styles.teams}>
      <div className={`${styles.team} ${styles.blueSide}`}>
        <p>Fnatic</p>
        <Image src="/teams/fnc.png" width="60" height="60" alt="Fnatic logo" />
      </div>
      <div>VS</div>
      <div className={styles.team}>
        <Image src="/teams/g2.png" width="60" height="60" alt="G2 Esports logo" />
        <p>G2 Esports</p>
      </div>
    </div>
  )
}

export default Teams
