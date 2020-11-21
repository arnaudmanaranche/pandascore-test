import React from 'react'
import Head from 'next/head'

import Objective from '@components/Objective/Objective'
import Teams from '@components/Teams/Teams'
import GoldDifference from '@components/Chart/Chart'
import Kill from '@static/svgs/kill.svg'
import Inib from '@static/svgs/inib.svg'
import Tower from '@static/svgs/tower.svg'
import Gold from '@static/svgs/gold.svg'
import Baron from '@static/svgs/baron.svg'
import Herald from '@static/svgs/herald.svg'
import Drake from '@static/svgs/drake.svg'
import { LolFrame } from '@interfaces'
import {
  INHIBITORS_DESTROYED,
  TOWERS_DESTROYED,
  TOTAL_GOLD,
  HERALDS,
  BARONS,
  DRAKES,
  BLUE_TEAM,
  RED_TEAM,
} from '@utils/constants'

import styles from './Index.module.scss'

export default function Home(): JSX.Element {
  const ws = React.useRef(null)
  const [event, setNewEvent] = React.useState<LolFrame>(null)
  const [blueGold, setBlueGold] = React.useState<number[]>([2500])
  const [redGold, setRedGold] = React.useState<number[]>([2500])
  const [checkGold, setCheckGold] = React.useState<boolean>(false)

  React.useEffect(() => {
    ws.current = new WebSocket('ws://localhost:4000/')
    ws.current.onopen = () => console.log('Game start...')
    ws.current.onclose = () => console.log('Game finished. G2 won (as always)')

    return () => {
      ws.current.close()
    }
  }, [])

  React.useEffect(() => {
    if (!ws.current) return

    const interval = setInterval(() => setCheckGold(true), 15000)

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data)

      if (checkGold) {
        setBlueGold((oldState) => {
          if (message.blue.gold !== oldState[oldState.length - 1]) {
            return [...oldState, message.blue.gold]
          } else {
            return oldState
          }
        })
        setRedGold((oldState) => {
          if (message.red.gold !== oldState[oldState.length - 1]) {
            return [...oldState, message.red.gold]
          } else {
            return oldState
          }
        })

        setCheckGold(false)
      }

      setNewEvent(message)
    }

    return () => clearInterval(interval)
  }, [checkGold])

  return (
    <>
      <Head>
        <title>
          {BLUE_TEAM} vs {RED_TEAM}
        </title>
      </Head>
      <Teams />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.blueSide}>
            <div className={styles.objectives}>
              <Objective
                data={event?.blue?.inhibitors}
                svg={Inib}
                label={INHIBITORS_DESTROYED}
                reverse={true}
              />
              <Objective
                data={event?.blue?.towers}
                svg={Tower}
                label={TOWERS_DESTROYED}
                reverse={true}
              />
              <Objective data={event?.blue?.gold} svg={Gold} label={TOTAL_GOLD} reverse={true} />
            </div>
          </div>
          <div className={styles.other}>
            <div className={styles.kills}>
              <span>{event?.blue?.kills || 0}</span>
              <Kill />
              <span>{event?.red?.kills || 0}</span>
            </div>
          </div>
          <div className={styles.redSide}>
            <div className={styles.objectives}>
              <Objective
                data={event?.red?.inhibitors}
                svg={Inib}
                label={INHIBITORS_DESTROYED}
                reverse={false}
              />
              <Objective
                data={event?.red?.towers}
                svg={Tower}
                label={TOWERS_DESTROYED}
                reverse={false}
              />
              <Objective data={event?.red?.gold} svg={Gold} label={TOTAL_GOLD} reverse={false} />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.neutralObjectives}>
            <div className={styles.block}>
              <Objective data={event?.blue?.herald} svg={Herald} label={HERALDS} reverse={true} />
              <Objective data={event?.blue?.nashors} svg={Baron} label={BARONS} reverse={true} />
            </div>
            <Objective data={event?.blue?.drakes} svg={Drake} label={DRAKES} reverse={true} />
          </div>
          <div className={styles.currentTime}>
            {event?.current_timestamp
              ? `0${Math.floor(event.current_timestamp / 60)} : ${event.current_timestamp % 60 ? event.current_timestamp % 60 : '00'
              }`
              : '00:00'}
          </div>
          <div className={styles.neutralObjectives}>
            <Objective data={event?.red?.drakes} svg={Drake} label={DRAKES} reverse={false} />
            <div className={styles.block}>
              <Objective data={event?.red?.nashors} svg={Baron} label={BARONS} reverse={false} />
              <Objective data={event?.red?.herald} svg={Herald} label={HERALDS} reverse={false} />
            </div>
          </div>
        </div>
        <div className={`${styles.container} ${styles.chart}`}>
          <p>GOLD</p>
          <GoldDifference blueGold={blueGold} redGold={redGold} />
        </div>
      </div>
    </>
  )
}
