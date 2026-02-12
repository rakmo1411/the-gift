import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingSection from './components/LandingSection'
import FloatingHearts from './components/FloatingHearts'
import InteractiveFlow from './components/InteractiveFlow'
import SurpriseReveal from './components/SurpriseReveal'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

type AppPhase = 'landing' | 'flow' | 'surprise'

function App() {
    const [phase, setPhase] = useState<AppPhase>('landing')

    return (
        <div className="app">
            <FloatingHearts count={25} />
            <MusicPlayer />

            <AnimatePresence mode="wait">
                {phase === 'landing' && (
                    <LandingSection
                        key="landing"
                        onStart={() => setPhase('flow')}
                    />
                )}

                {phase === 'flow' && (
                    <InteractiveFlow
                        key="flow"
                        onComplete={() => setPhase('surprise')}
                    />
                )}

                {phase === 'surprise' && (
                    <SurpriseReveal key="surprise" />
                )}
            </AnimatePresence>
        </div>
    )
}

export default App
