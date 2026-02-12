import { useMemo } from 'react'
import './FloatingHearts.css'

interface FloatingHeartsProps {
    count?: number
}

const heartChars = ['❤️', '💕', '💗', '💖', '🩷', '♥️']

function FloatingHearts({ count = 20 }: FloatingHeartsProps) {
    const hearts = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const size = 14 + Math.random() * 26
            const left = Math.random() * 100
            const duration = 6 + Math.random() * 10
            const delay = Math.random() * duration
            const drift = -30 + Math.random() * 60
            const spin = Math.random() * 360
            const opacity = 0.2 + Math.random() * 0.5
            const heart = heartChars[Math.floor(Math.random() * heartChars.length)]

            return (
                <span
                    key={i}
                    className="floating-heart"
                    style={{
                        left: `${left}%`,
                        fontSize: `${size}px`,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        opacity,
                        '--drift': `${drift}px`,
                        '--spin': `${spin}deg`,
                    } as React.CSSProperties}
                >
                    {heart}
                </span>
            )
        })
    }, [count])

    return <div className="floating-hearts-container">{hearts}</div>
}

export default FloatingHearts
