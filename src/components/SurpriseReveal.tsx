import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeMusic } from './MusicPlayer'
import Confetti from './Confetti'
import './SurpriseReveal.css'

/*
  Animation stages:
  0 = teaser (gift box wobbling, "Are you ready?")
  1 = box shaking intensely (0.8s)
  2 = lid flies off + golden light burst (1s)
  3 = love letter rises from the box (1s)
  4 = letter fully revealed + confetti
  5 = finale — thank you, music fades, goodbye
*/
type Stage = 0 | 1 | 2 | 3 | 4 | 5

function SurpriseReveal() {
    const [stage, setStage] = useState<Stage>(0)
    const [musicFaded, setMusicFaded] = useState(false)

    const handleOpen = () => {
        if (stage !== 0) return
        setStage(1)
    }

    // Auto-advance through animation stages
    useEffect(() => {
        if (stage === 1) {
            const t = setTimeout(() => setStage(2), 900)
            return () => clearTimeout(t)
        }
        if (stage === 2) {
            const t = setTimeout(() => setStage(3), 1100)
            return () => clearTimeout(t)
        }
        if (stage === 3) {
            const t = setTimeout(() => setStage(4), 800)
            return () => clearTimeout(t)
        }
    }, [stage])

    // Handle finale — fade music
    const handleFinale = () => {
        setStage(5)
        fadeMusic(6000)
        setTimeout(() => setMusicFaded(true), 6500)
    }

    return (
        <motion.div
            className="section surprise-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Confetti — appears once fully revealed */}
            {stage >= 3 && stage < 5 && <Confetti count={80} />}

            <AnimatePresence mode="wait">
                {stage < 3 ? (
                    /* === GIFT BOX SCENE === */
                    <motion.div
                        key="gift-scene"
                        className="gift-scene"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Teaser text */}
                        <motion.h2
                            className="surprise-teaser-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            I have something special for you...
                        </motion.h2>

                        <motion.p
                            className="surprise-teaser-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: stage === 0 ? 1 : 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Are you ready?
                        </motion.p>

                        {/* The gift box */}
                        <div className={`gift-box-wrapper ${stage >= 1 ? 'shaking' : ''}`}>
                            {/* Golden light burst */}
                            <motion.div
                                className="gift-glow-burst"
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={{
                                    opacity: stage >= 2 ? 1 : 0,
                                    scale: stage >= 2 ? 2.5 : 0.3,
                                }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            />

                            {/* Box base */}
                            <div className="gift-box">
                                <div className="gift-box-front">
                                    <div className="gift-ribbon-v" />
                                    <div className="gift-ribbon-h" />
                                </div>
                            </div>

                            {/* Box lid */}
                            <motion.div
                                className="gift-lid"
                                animate={
                                    stage >= 2
                                        ? { y: -200, rotate: 25, opacity: 0, scale: 0.6 }
                                        : stage >= 1
                                            ? { rotate: [-2, 2, -3, 3, -1, 1, 0] }
                                            : { y: 0, rotate: 0 }
                                }
                                transition={
                                    stage >= 2
                                        ? { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
                                        : stage >= 1
                                            ? { duration: 0.12, repeat: 7, ease: 'linear' }
                                            : { duration: 0.3 }
                                }
                            >
                                <div className="gift-lid-top">
                                    <div className="gift-bow">
                                        <div className="gift-bow-loop left" />
                                        <div className="gift-bow-loop right" />
                                        <div className="gift-bow-knot" />
                                    </div>
                                    <div className="gift-ribbon-v lid-ribbon" />
                                </div>
                            </motion.div>

                            {/* Sparkle particles from inside the box when lid opens */}
                            {stage >= 2 && (
                                <div className="gift-sparkles-burst">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <motion.span
                                            key={i}
                                            className="gift-sparkle-particle"
                                            initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                                            animate={{
                                                y: -60 - Math.random() * 120,
                                                x: -80 + Math.random() * 160,
                                                opacity: 0,
                                                scale: 0.3,
                                            }}
                                            transition={{
                                                duration: 0.8 + Math.random() * 0.6,
                                                delay: Math.random() * 0.3,
                                                ease: 'easeOut',
                                            }}
                                            style={{ color: ['#ffd700', '#ff69b4', '#ffffff', '#ffe082'][i % 4] }}
                                        >
                                            ✦
                                        </motion.span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Open button */}
                        {stage === 0 && (
                            <motion.button
                                className="btn-romantic surprise-btn"
                                onClick={handleOpen}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Open Your Gift ✨
                            </motion.button>
                        )}
                    </motion.div>
                ) : stage <= 4 ? (
                    /* === LOVE LETTER REVEAL === */
                    <motion.div
                        key="letter-reveal"
                        className="surprise-revealed"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <motion.div
                            className="glass-card love-letter"
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                type: 'spring',
                                stiffness: 100,
                                damping: 12,
                            }}
                        >
                            <div className="love-letter-glow" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <span className="love-letter-emoji">💌</span>
                                <h2 className="love-letter-title">My Letter To You</h2>
                                <div className="love-letter-divider" />
                            </motion.div>

                            <motion.div
                                className="love-letter-body"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 1 }}
                            >
                                <p>My Babdi,</p>
                                <p>
                                    On this beautiful day, I want you to know that you are the most
                                    incredible person I've ever known. You make my world brighter,
                                    my heart fuller, and my life more meaningful than I ever thought
                                    possible.
                                </p>
                                <p>
                                    Every day with you is a gift, and I am so grateful for your
                                    love, your laughter, and your beautiful soul. You have this
                                    magical way of making everything better just by being you.
                                </p>
                                <p>
                                    I hope this birthday brings you as much joy as you bring into
                                    my life every single day. You deserve the entire universe, and I
                                    want to spend forever trying to give it to you.
                                </p>
                                <p className="love-letter-closing">
                                    Happy Birthday, my love.
                                </p>
                                <p className="love-letter-signature">
                                    Forever yours ❤️ And Always
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="surprise-final-hearts"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1 }}
                        >
                            💕 💗 💖 💝 💕
                        </motion.div>

                        {/* Close letter → go to finale */}
                        <motion.button
                            className="btn-romantic finale-btn"
                            onClick={handleFinale}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3, duration: 0.8 }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Thank You For Reading 💕
                        </motion.button>
                    </motion.div>
                ) : (
                    /* === FINALE — Goodbye === */
                    <motion.div
                        key="finale"
                        className="finale-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        {/* Soft ambient glow */}
                        <div className="finale-ambient-glow" />

                        <motion.span
                            className="finale-heart"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 80 }}
                        >
                            ❤️
                        </motion.span>

                        <motion.h2
                            className="finale-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            Happy Birthday, My Love
                        </motion.h2>

                        <motion.div
                            className="finale-divider"
                            initial={{ width: 0 }}
                            animate={{ width: '100px' }}
                            transition={{ delay: 1.5, duration: 1 }}
                        />

                        <motion.p
                            className="finale-message"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 1 }}
                        >
                            Thank you for being the one of the most beautiful part of my life.
                            <br />
                            
                        </motion.p>

                        <motion.p
                            className="finale-submessage"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: musicFaded ? 1 : 0 }}
                            transition={{ duration: 1.5 }}
                        >
                            Go celebrate your day, beautiful ✨
                        </motion.p>

                        <motion.p
                            className="finale-credit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: musicFaded ? 0.4 : 0 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        >
                            made with all my love, just for you ❤️
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default SurpriseReveal
