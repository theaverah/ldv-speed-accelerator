export function PageGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-60">
      <div
        className="absolute inset-y-0 w-px"
        style={{ left: 'max(160px, calc(50vw - 560px))', backgroundColor: 'var(--color-800)' }}
      />
      <div
        className="absolute inset-y-0 w-px"
        style={{ right: 'max(160px, calc(50vw - 560px))', backgroundColor: 'var(--color-800)' }}
      />
    </div>
  )
}

export default PageGrid
