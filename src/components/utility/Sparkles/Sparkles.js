import { useState, useEffect, useRef, useCallback } from 'react'
import { generateSparkle, random } from '../../../utils/sparkle'
import Sparkle from '../Sparkle'

const Sparkles = ({ children }) => {
    const [sparkles, setSparkles] = useState([])
    useRandomInterval(
        () => {
            const now = Date.now()
            // Create a new sparkle
            const sparkle = generateSparkle()
            // Clean up any "expired" sparkles
            const nextSparkles = sparkles.filter(sparkle => {
                const delta = now - sparkle.createdAt
                return delta < 1000
            })
            // Include our new sparkle
            nextSparkles.push(sparkle)
            // Make it so!
            setSparkles(nextSparkles)
        },
        50,
        500
    )

    return (
        <span className={`relative inline-block`}>
            {sparkles &&
                sparkles.map((sparkle, index) => {
                    return (
                        <Sparkle
                            key={index}
                            color={sparkle.color}
                            size={sparkle.size}
                            style={sparkle.style}
                        />
                    )
                })}
            {children}
        </span>
    )
}

const useRandomInterval = (callback, minDelay, maxDelay) => {
    const timeoutId = useRef(null)
    const savedCallback = useRef(callback)
    useEffect(() => {
        savedCallback.current = callback
    })
    useEffect(() => {
        let isEnabled =
            typeof minDelay === 'number' && typeof maxDelay === 'number'
        if (isEnabled) {
            const handleTick = () => {
                const nextTickAt = random(minDelay, maxDelay)
                timeoutId.current = window.setTimeout(() => {
                    savedCallback.current()
                    handleTick()
                }, nextTickAt)
            }
            handleTick()
        }
        return () => window.clearTimeout(timeoutId.current)
    }, [minDelay, maxDelay])
    const cancel = useCallback(function () {
        window.clearTimeout(timeoutId.current)
    }, [])
    return cancel
}

export default Sparkles
