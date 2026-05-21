import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsRouterLink = CommonProps &
  Omit<LinkProps, keyof CommonProps> & {
    to: LinkProps['to']
    href?: undefined
  }

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
    to?: undefined
  }

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined
    to?: undefined
  }

export type ButtonProps = ButtonAsRouterLink | ButtonAsAnchor | ButtonAsButton

const base =
  'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50'

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-5 py-2 text-[11px] font-semibold uppercase tracking-wider',
  sm: 'px-5 py-2.5 text-sm font-semibold',
  md: 'px-6 py-3 text-xs font-bold uppercase tracking-wide',
  lg: 'px-7 py-3 text-sm font-bold uppercase tracking-wide',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blaze-red text-white shadow-sm hover:bg-blaze-red-hover',
  outline: 'border border-white/30 text-white hover:bg-white/10',
  ghost: 'text-white/90 hover:text-white',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props

  const classes = cn(base, sizeClasses[size], variantClasses[variant], className)

  if ('to' in rest && rest.to !== undefined) {
    const linkProps = rest as Omit<LinkProps, 'children' | 'className'>
    return (
      <Link {...linkProps} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  )
}
