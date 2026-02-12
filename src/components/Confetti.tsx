import { useMemo } from 'react'
import './Confetti.css'

interface ConfettiProps {
    count?: number
}

const confettiColors = ['#ff69b4', '#e91e63', '#d32f2f', '#ffd700', '#ff8a80', '#ffb6d9', '#f48fb1']
const confettiShapes = ['❤️', '💖', '💕', '✨', '🩷', '⭐', '💗']

function Confetti({ count = 60 }: ConfettiProps) {
    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const useEmoji = Math.random() > 0.5
            const left = Math.random() * 100
            const delay = Math.random() * 2
            const duration = 2 + Math.random() * 3
            const spin = 360 + Math.random() * 720
            const size = useEmoji ? 16 + Math.random() * 14 : 8 + Math.random() * 10

            if (useEmoji) {
                const emoji = confettiShapes[Math.floor(Math.random() * confettiShapes.length)]
                return (
                    <span
                        key={i}
                        className="confetti-particle confetti-emoji"
                        style={{
                            left: `${left}%`,
                            fontSize: `${size}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            '--spin': `${spin}deg`,
                        } as React.CSSProperties}
                    >
                        {emoji}
                    </span>
                )
            }

            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
            return (
                <span
                    key={i}
                    className="confetti-particle confetti-shape"
                    style={{
                        left: `${left}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        '--spin': `${spin}deg`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    } as React.CSSProperties}
                />
            )
        })
    }, [count])

    return <div className="confetti-container">{particles}</div>
}

export default Confetti
