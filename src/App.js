import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Header
} from 'react-router-dom'

import { Container, Divider, Header as UiHeader } from 'semantic-ui-react'

import Swap from './Swap'
import Withdraw from './Withdraw'
import Login from './Login'

function NoMatch() {
    let location = useLocation()

    return (
        <Container text>
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

function App() {
    return (
        <Container inverted text>
            <Divider hidden />
            <img src="https://knit.finance/img/logo-light.png" alt="logo"></img>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />

            <Router>
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
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </Container>
    )
}

export default App
