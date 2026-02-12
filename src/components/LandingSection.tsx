import { motion } from 'framer-motion'
import { startMusic } from './MusicPlayer'
import './LandingSection.css'

interface LandingSectionProps {
    onStart: () => void
}

function LandingSection({ onStart }: LandingSectionProps) {
    return (
        <motion.div
            className="section landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
        >
            {/* Decorative sparkles */}
            <div className="sparkles">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        className="sparkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <motion.div
                className="landing-content"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            >
                <motion.div
                    className="heart-icon-large"
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    ❤️
                </motion.div>

                <motion.h1
                    className="landing-title"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                >
                    Happy Birthday
                </motion.h1>

                <motion.p
                    className="landing-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    I made something special for you...
                </motion.p>

                <motion.div
                    className="landing-divider"
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ delay: 1.6, duration: 0.8, ease: 'easeInOut' }}
                />

                <motion.button
                    className="btn-romantic landing-btn"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { startMusic(); onStart(); }}
                >
                    Tap to Begin ✨
                </motion.button>
            </motion.div>

            {/* Bottom decorative text */}
            <motion.p
                className="landing-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                made with all my love ❤️
            </motion.p>
        </motion.div>
    )
}

export default LandingSection
