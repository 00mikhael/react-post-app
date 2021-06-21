import './App.css'

import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ScrollToTop from './components/hooks/ScrollToTop'

import Base from './components/sections/Base'
import Header from './components/sections/Header'
import Main from './components/sections/Main'
import Footer from './components/sections/Footer'

import { refreshToken, retrieveUser } from './actions/user'

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [refreshInterval, setRefreshInterval] = useState(0)

    useEffect(() => {
        dispatch(refreshToken())
            .then(res => {
                dispatch(retrieveUser())
            })
            .catch(err => {
                console.log(err)
            }) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let timer
        if (refreshInterval) {
            timer = setInterval(() => {
                dispatch(refreshToken())
            }, refreshInterval)
        }
        return () => {
            clearInterval(timer)
        } // eslint-disable-next-line
    }, [refreshInterval])

    useEffect(() => {
        if (user?.username) {
            setRefreshInterval(user.jwtExp * 1000 - 5000)
        }
    }, [user])

    return (
        <Router>
            <ScrollToTop>
                <Base className={`min-h-screen opacity-100`}>
                    <Header
                        className={`header bg rounded-bl-3xl  row-start-1 row-end-3 col-start-1 col-end-2`}
                    />

                    <Main
                        className={`row-start-2 row-end-4 col-start-1 col-end-2 z-10 min-h-screen mt-24`}
                    />
                    <Footer
                        className={`row-start-4 row-end-5 col-start-1 col-end-2 mt-6`}
                    />
                </Base>
            </ScrollToTop>
        </Router>
    )
}

export default App
