// import logo from './logo.svg'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Add from './pages/Add'

import { getUser } from './services/userService'

function App() {
    const [user, setUser] = useState()
    const fetchUser = async () => {
        await getUser()
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <Router>
            <div className={`bg-gray-100 h-auto  min-h-screen `}>
                <Nav user={user} />
                <div>
                    <Route exact path={['/', '/posts']} component={Home} />
                    <Route exact path={'/posts/:id'} component={Detail} />
                    <Route exact path={'/add'} component={Add} />
                </div>
            </div>
        </Router>
    )
}

export default App
