import clsx from 'clsx'

import s from './styles.module.scss'

type CarouselItemProps = {
  title: string
  style?: React.CSSProperties
}

export const CarouselItem = (props: CarouselItemProps) => {
  const { title, style } = props

  return (
    <>
      <div className={s.item_wrapper} style={style}>
        <span className={clsx(s.circle, s.circle_01, s.violet)} />
        <span className={clsx(s.circle, s.circle_02, s.violet)} />
        <div className={s.item_title}>{title}</div>
      </div>
      {/* <div className={s.card_wrapper}>
        <span className={clsx(s.circle, s.circle_01, s.jade)} />
        <span className={clsx(s.circle, s.circle_02, s.jade)} />
      </div>
      <div className={s.card_wrapper}>
        <span className={clsx(s.circle, s.circle_01, s.sky)} />
        <span className={clsx(s.circle, s.circle_02, s.sky)} />
      </div>
      <div className={s.card_wrapper}>
        <span className={clsx(s.circle, s.circle_01, s.citron)} />
        <span className={clsx(s.circle, s.circle_02, s.citron)} />
      </div> */}
    </>
  )
}

//role="group" aria-roledescription="slide"
