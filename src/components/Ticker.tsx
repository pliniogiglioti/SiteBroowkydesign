interface TickerProps {
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

const roles = [
  'UI/UX DESIGNER',
  'ILLUSTRATOR',
  'DESIGNER GRAPHICS',
  'UI/UX DESIGNER',
  'WEB DEVELOPER',
]

export default function Ticker({ direction = 'left', speed = 20, className = '' }: TickerProps) {
  const items = [...roles, ...roles, ...roles, ...roles]

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        className="flex items-center gap-0 w-max"
        style={{
          animation: `ticker ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {items.map((role, i) => (
          <span key={i} className="flex items-center">
            <span className="font-geist font-bold text-[42px] tracking-[0.02em] text-white whitespace-nowrap px-6">
              {role}
            </span>
            <span className="text-white text-[42px] font-bold">—</span>
          </span>
        ))}
      </div>
    </div>
  )
}
