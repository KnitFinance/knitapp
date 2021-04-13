import {
    Container,
    Divider,
    Statistic,
    Header as UiHeader
} from 'semantic-ui-react'
import React, { useState, Suspense, useContext } from 'react'
import {
    Route,
    BrowserRouter as Router,
    Switch,
    useLocation
} from 'react-router-dom'

import FooterNav from './FooterNav'
import { UserContext } from './actions/userContext'
import { getInfo } from './actions'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CounterContextProvider } from './context'

const Swapv2 = React.lazy(() => import('./Swapv2'))
const Dashboard = React.lazy(() => import('./Dashboard'))
const Login = React.lazy(() => import('./Login'))
const Withdraw = React.lazy(() => import('./Withdraw'))
const History = React.lazy(() => import('./History'))

function NoMatch() {
    let location = useLocation()
    return (
        <Container>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <UiHeader as="h2" inverted>
                No match for <code>{location.pathname}</code>
            </UiHeader>
            <Divider hidden />
            <UiHeader as="h3" inverted>
                <a href="/">Swap</a> &nbsp;
                <a href="/admin">Login</a> &nbsp;
                <a href="/withdraw">Withdraw</a> &nbsp;
            </UiHeader>

            <Divider hidden />
            <Divider hidden />
        </Container>
    )
}

const TopMenu = () => {
    const [info, setInfo] = useState([])
    const [network, setNetwork] = React.useState(
        reactLocalStorage.get('network', 'BSC')
    )

    React.useEffect(() => {}, [])
    return (
        <div className={'topmenusec'}>
            <a href="/">
                <img
                    src="https://knit.finance/img/logo-light.png"
                    alt="logo"></img>
            </a>

            <FooterNav />
        </div>
    )
}

function App() {
    const [user, setUser] = useState(localStorage.getItem('user') || null)

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }
    const value = {
        user: user,
        logout: logout
    }
    return (
        <UserContext.Provider value={value}>
            <CounterContextProvider>
                <Container inverted text>
                    <Router>
                        <Divider hidden />
                        <TopMenu />
                        <Divider hidden />
                        <Divider hidden />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/" component={Swapv2} />
                                <Route
                                    exact
                                    path="/withdraw"
                                    component={Withdraw}
                                />
                                <Route
                                    exact
                                    path="/history"
                                    component={History}
                                />
                                <Route exact path="/admin">
                                    {user === null ? <Login /> : <Dashboard />}
                                </Route>
                                <Route path="*">
                                    <NoMatch />
                                </Route>
                            </Switch>
                        </Suspense>
                        <Divider hidden />
                        <Divider hidden />
                    </Router>

                    <Divider hidden />
                </Container>
            </CounterContextProvider>
        </UserContext.Provider>
    )
}

export default App
