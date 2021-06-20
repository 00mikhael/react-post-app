import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollTopTop = ({ history, children }) => {
    useEffect(() => {
        const unListen = history.listen(() => {
            window.scrollTo(0, 0)
        })
        return () => {
            unListen()
        } // eslint-disable-next-line
    }, [])
    return <>{children}</>
}

export default withRouter(ScrollTopTop)
