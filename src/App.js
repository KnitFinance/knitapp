import {
    Container,
    Divider,
    Statistic,
    Header as UiHeader
} from 'semantic-ui-react'
import React, { useState } from 'react'
import {
    Route,
    BrowserRouter as Router,
    Switch,
    useLocation
} from 'react-router-dom'

import Dashboard from './Dashboard'
import FooterNav from './FooterNav'
import Login from './Login'
import Swap from './Swap'
import { UserContext } from './actions/userContext'
import Withdraw from './Withdraw'

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
                <a href="/">Home</a> &nbsp;
                <a href="/">Swap</a> &nbsp;
                <a href="/admin">Login</a> &nbsp;
                <a href="/withdraw">Withdraw</a> &nbsp;
            </UiHeader>

            <Divider hidden />
            <Divider hidden />
        </Container>
    )
}

function TopMenu() {
    return (
        <div className={'topmenusec'}>
            <a href="/">
                <img
                    src="https://knit.finance/img/logo-light.png"
                    alt="logo"></img>
            </a>

            <Statistic.Group size={'mini'} inverted color="blue">
                <Statistic></Statistic>
                <Statistic>
                    <Statistic.Value>22</Statistic.Value>
                    <Statistic.Label>ETH</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>22</Statistic.Value>
                    <Statistic.Label>ETH</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>22</Statistic.Value>
                    <Statistic.Label>ETH</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>22</Statistic.Value>
                    <Statistic.Label>ETH</Statistic.Label>
                </Statistic>
            </Statistic.Group>

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
            <Container inverted text>
                <Router>
                    <Divider hidden />
                    <TopMenu />
                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />
                    <Switch>
                        <Route exact path="/" components={Swap}>
                            <Swap />
                        </Route>
                        <Route exact path="/withdraw">
                            <Withdraw />
                        </Route>
                        <Route exact path="/admin">
                            {user === null ? <Login /> : <Dashboard />}
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </Router>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
            </Container>
        </UserContext.Provider>
    )
}

export default App
