import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './InteractiveFlow.css'

interface InteractiveFlowProps {
    onComplete: () => void
}

const loveMessages = [
    {
        emoji: '🌹',
        title: 'To My Everything',
        text: 'From the moment you walked into my life, every day has become a celebration. Today, I celebrate the most beautiful gift the universe ever gave me — you.(And I am sorry the gift I will be giving will be nothing compared to what you mean to me)',
    },
    {
        emoji: '✨',
        title: 'You Are My Sunshine',
        text: 'Your smile lights up my darkest days. Your laugh is my favorite melody. Every moment with you feels like a dream I never want to wake up from.',
    },
    {
        emoji: '💕',
        title: 'My Favorite Memories',
        text: "Remember our late-night talks, our silly inside jokes(Eg: My friends and yours too 😉), our fights, the feeling of resolving those fights and smiling after them and all those little moments that mean the world to me? Every single one is a treasure I hold close to my heart.",
    },
    {
        emoji: '🌱',
        title: 'Growing Together',
        text: "I love who we are, but I also love who we’re becoming. Thank you for being the person who challenges me to grow while loving me exactly as I am right now.",
    },
    {
        emoji: '🚀',
        title: 'Our Potential',
        text: "There is no ceiling on what we can do together. I love your ambition, your drive, and the way we push each other to be the best versions of ourselves.",
    },
    {
        emoji: '✈️',
        title: 'Counting the Miles',
        text: "Every mile between us is just a reminder of how much more I’ll appreciate the next time I get to hold you. Distance is temporary; we are permanent.",
    },
    {
        emoji: '🔥',
        title: 'That Spark',
        text: "It’s been so long since our first kiss (I still can’t believe it and I know it wasn't the one we dreamt of😂), but I still get those same restless butterflies every time your hand brushes against mine. You’ve never lost that magic of making me feel something different.",
    },
    {
        emoji: '🌙',
        title: 'What You Mean To Me',
        text: "You're not just my love — you're my best friend, my peace, my safe place. With you, I've found a love I didn't even know was possible.",
    },
    {
        emoji: '🎂',
        title: 'A Birthday Wish',
        text: 'On your special day, I wish you all the happiness, love, and magic that you bring into my life every single day. May this year bring you everything your beautiful heart desires.',
    },
    {
        emoji: '💖',
        title: 'Forever & Always',
        text: 'I promise to love you louder, hold you closer, and cherish you more with every passing day. You deserve the world, and I want to give it to you — starting today.',
    }

]

function InteractiveFlow({ onComplete }: InteractiveFlowProps) {
    const [showIntro, setShowIntro] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const isLast = currentIndex === loveMessages.length - 1
    const message = loveMessages[currentIndex]
    const progress = ((currentIndex + 1) / loveMessages.length) * 100

    const handleNext = () => {
        if (isLast) {
            onComplete()
        } else {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    return (
        <motion.div
            className="section flow-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <AnimatePresence mode="wait">
                {showIntro ? (
                    /* Intro note — cherish every word */
                    <motion.div
                        key="intro"
                        className="flow-intro"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <motion.span
                            className="flow-intro-icon"
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            💝
                        </motion.span>

                        <h2 className="flow-intro-title">Before you begin...</h2>

                        <motion.div
                            className="flow-divider"
                            initial={{ width: 0 }}
                            animate={{ width: '80px' }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        />

                        <p className="flow-intro-text">
                            What follows are words written from the deepest corner of my heart.
                            Please take your time. Read slowly. Feel every word.
                            This is not something to rush through — it's something to cherish.
                        </p>

                        <motion.p
                            className="flow-intro-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 1.5, duration: 1 }}
                        >
                            ✨ Every note here is a piece of my love for you ✨
                        </motion.p>

                        <motion.button
                            className="btn-romantic flow-btn"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 0.6 }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowIntro(false)}
                        >
                            I'm ready ❤️
                        </motion.button>
                    </motion.div>
                ) : (
                    /* Messages flow */
                    <motion.div
                        key="messages"
                        className="flow-messages-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Progress bar */}
                        <div className="flow-progress-bar">
                            <motion.div
                                className="flow-progress-fill"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                        </div>

                        {/* Progress hearts */}
                        <div className="flow-progress-dots">
                            {loveMessages.map((_, i) => (
                                <span
                                    key={i}
                                    className={`flow-dot ${i <= currentIndex ? 'active' : ''}`}
                                >
                                    {i <= currentIndex ? '❤️' : '🤍'}
                                </span>
                            ))}
                        </div>

                        {/* Message card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="glass-card flow-card"
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <motion.span
                                    className="flow-emoji"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    {message.emoji}
                                </motion.span>

                                <motion.h2
                                    className="flow-title"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    {message.title}
                                </motion.h2>

                                <motion.div
                                    className="flow-divider"
                                    initial={{ width: 0 }}
                                    animate={{ width: '80px' }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                />

                                <motion.p
                                    className="flow-text"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                >
                                    {message.text}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Next button */}
                        <motion.button
                            className="btn-romantic flow-btn"
                            onClick={handleNext}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLast ? 'See Your Surprise 🎁' : 'Next ❤️'}
                        </motion.button>

                        {/* Step counter */}
                        <motion.p
                            className="flow-counter"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 1 }}
                        >
                            {currentIndex + 1} of {loveMessages.length}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default InteractiveFlow
