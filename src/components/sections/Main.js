import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Dashboard from '../pages/Dashboard'

const Main = ({ className }) => {
    return (
        <main className={`${className}`}>
            <Route exact path={['/', '/posts']} component={Home} />
            <Route exact path={'/posts/:id'} component={Detail} />
            <Route exact path={'/dashboard'} component={Dashboard} />
        </main>
    )
}

export default Main
