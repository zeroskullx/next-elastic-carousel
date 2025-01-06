import clsx from 'clsx'
import s from './styles.module.scss'

type CheckboxProps = {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  title: string
  disabled?: boolean
}

export function Checkbox(props: CheckboxProps) {
  const { checked, onChange, title, disabled = false } = props

  return (
    <label className={clsx(s.checkbox_wrapper, disabled && s.disabled)}>
      <span className={clsx(s.checkbox_switch, checked && s.checked)}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {checked && (
            <>
              <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
              <path d="m9 11 3 3L22 4" />
            </>
          )}
          {!checked && <rect width="18" height="18" x="3" y="3" rx="2" />}
        </svg>
      </span>
      {title && <span className={s.checkbox_title}>{title}</span>}
    </label>
  )
}
