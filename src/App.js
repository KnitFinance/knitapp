import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from 'react-router-dom'
import { Container, Divider, Header as UiHeader } from 'semantic-ui-react'
import Swap from './Swap'
import Withdraw from './Withdraw'
import Login from './Login'
import FooterNav from './FooterNav'
// import MobileNav from './MobileNav'
import Transactions from './Transactions'
import Withdrawals from './Withdrawals'
import { UserContext } from './actions/userContext'

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
            <FooterNav />
        </div>
    )
}

function App() {
    const [user, setUser] = useState(localStorage.getItem('user') || null)
    const logout = () => {
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
                        <Route exact path="/">
                            <Swap />
                        </Route>
                        <Route exact path="/withdraw">
                            <Withdraw />
                        </Route>
                        <Route exact path="/admin">
                            <Login />
                        </Route>
                        <Route exact path="/admin/txs">
                            <Transactions />
                        </Route>
                        <Route exact path="/admin/withdrawals">
                            <Withdrawals />
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
