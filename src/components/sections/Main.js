import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Dashboard from '../pages/Dashboard'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import CancelPasswordReset from '../pages/CancelPasswordReset'

const Main = ({ className }) => {
    return (
        <main className={`${className}`}>
            <Route exact path={['/', '/posts']} component={Home} />
            <Route exact path={'/posts/:id'} component={Detail} />
            <Route exact path={'/dashboard'} component={Dashboard} />
            <Route
                exact
                path={'/resetPassword/:resetToken/:id'}
                component={ResetPassword}
            />
            <Route
                exact
                path={'/cancelPasswordReset/:resetToken/:id'}
                component={CancelPasswordReset}
            />
        </main>
    )
}

export default Main
