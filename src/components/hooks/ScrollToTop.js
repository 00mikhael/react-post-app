import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import { FiChevronUp } from 'react-icons/fi'

const ScrollTopTopWrapper = ({ history, children }) => {
    useEffect(() => {
        const unListen = history.listen(() => {
            window.scrollTo(0, 0)
        })
        return () => {
            unListen()
        } // eslint-disable-next-line
    }, [])
    return (
        <>
            {children}
            <ScrollToTop
                smooth
                top={70}
                component={<FiChevronUp />}
                style={{
                    position: 'fixed',
                    left: '0',
                    bottom: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#44337a',
                    fontSize: '20px',
                    margin: '1.5rem',
                    padding: '5px',
                    opacity: '.4',
                    backgroundColor: '#805ad5',
                    borderRadius: '10%',
                    outlineColor: 'transparent'
                }}
            />
        </>
    )
}

export default withRouter(ScrollTopTopWrapper)
