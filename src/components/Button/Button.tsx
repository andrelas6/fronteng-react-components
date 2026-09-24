import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', style, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      data-variant={variant}
      style={{
        padding: '8px 16px',
        borderRadius: 6,
        border: '1px solid #646cff',
        background: variant === 'primary' ? '#646cff' : 'transparent',
        color: variant === 'primary' ? 'white' : '#646cff',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    />
  )
}
