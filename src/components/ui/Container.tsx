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
        paddingLeft: 'max(160px, calc(50vw - 560px))',
        paddingRight: 'max(160px, calc(50vw - 560px))',
      }}
    >
      {children}
    </Tag>
  )
}

export default Container
