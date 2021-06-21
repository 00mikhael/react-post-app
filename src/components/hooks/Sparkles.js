import { useState } from 'react'
import { generateSparkle } from '../../utils/sparkle'
import Sparkle from './Sparkle'
import useRandomInterval from './RandomInterval'

const Sparkles = ({ children }) => {
    const [sparkles, setSparkles] = useState([])
    useRandomInterval(
        () => {
            const now = Date.now()

            const sparkle = generateSparkle()

            // Clean up any "expired" sparkles
            const nextSparkles = sparkles.filter(sparkle => {
                const delta = now - sparkle.createdAt
                return delta < 1000
            })

            nextSparkles.push(sparkle)

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

export default Sparkles
