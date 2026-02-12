import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MusicPlayer.css'

// Global audio instance so it persists across re-renders
let globalAudio: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement {
    if (!globalAudio) {
        globalAudio = new Audio('/music.m4a')
        globalAudio.loop = true
        globalAudio.volume = 0.2
    }
    return globalAudio
}

// Expose a global function to start music from anywhere (e.g., on "Tap to Begin")
export function startMusic() {
    const audio = getAudio()
    audio.play().catch(() => {
        // Autoplay blocked — user hasn't interacted yet, that's fine
    })
}

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showAttention, setShowAttention] = useState(true)
    const checkInterval = useRef<ReturnType<typeof setInterval> | null>(null)

    // Sync UI state with actual audio playback
    useEffect(() => {
        checkInterval.current = setInterval(() => {
            const audio = getAudio()
            const playing = !audio.paused && !audio.ended && audio.currentTime > 0
            setIsPlaying(playing)

            // Show toast when music actually starts for the first time
            if (playing && showAttention) {
                setShowToast(true)
                setShowAttention(false)
                setTimeout(() => setShowToast(false), 3500)
            }
        }, 300)

        return () => {
            if (checkInterval.current) clearInterval(checkInterval.current)
        }
    }, [showAttention])

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (globalAudio) {
                globalAudio.pause()
                globalAudio.src = ''
                globalAudio = null
            }
        }
    }, [])

    const togglePlay = useCallback(async () => {
        const audio = getAudio()

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            try {
                await audio.play()
                setIsPlaying(true)
            } catch {
                // Play failed
            }
        }
    }, [isPlaying])

    return (
        <>
            {/* Toast notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="music-toast"
                        initial={{ opacity: 0, y: 20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <span className="music-toast-icon">🎵</span>
                        <span className="music-toast-text">Music is playing</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Player button */}
            <motion.button
                className={`music-player ${isPlaying ? 'playing' : ''} ${showAttention ? 'attention' : ''}`}
                onClick={togglePlay}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
                aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            >
                <span className="music-icon">
                    {isPlaying ? '🎵' : '🎶'}
                </span>
                {isPlaying && (
                    <span className="music-bars">
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                    </span>
                )}
            </motion.button>
        </>
    )
}

export default MusicPlayer
