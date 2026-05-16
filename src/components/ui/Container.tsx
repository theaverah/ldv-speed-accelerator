import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={cn('w-full', className)}
      style={{
        paddingLeft: 'var(--container-px)',
        paddingRight: 'var(--container-px)',
      }}
    >
      {children}
    </Tag>
  )
}

export default Container
