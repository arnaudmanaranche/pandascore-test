import styles from './Objective.module.scss'

type ObjectiveProps = {
  data: number
  reverse: boolean
  svg: () => JSX.Element
  label: string
}

function Objective(props: ObjectiveProps): JSX.Element {
  const { data = 0, reverse, svg: SVG, label } = props

  return (
    <div className={`${styles.objective} ${!reverse && styles.reverse}`} title={label}>
      <span className={styles.value}>{data}</span>
      <SVG />
    </div>
  )
}

export default Objective
