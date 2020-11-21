import Image from 'next/image'
import styles from './Teams.module.scss'

import { BLUE_TEAM, RED_TEAM } from '@utils/constants'

function Teams(): JSX.Element {
  return (
    <div className={styles.teams}>
      <div className={`${styles.team} ${styles.blueSide}`}>
        <p>{BLUE_TEAM}</p>
        <Image src="/teams/fnc.png" width="60" height="60" alt={`${BLUE_TEAM} logo`} />
      </div>
      <div>VS</div>
      <div className={styles.team}>
        <Image src="/teams/g2.png" width="60" height="60" alt={`${RED_TEAM} logo`} />
        <p>{RED_TEAM}</p>
      </div>
    </div>
  )
}

export default Teams
