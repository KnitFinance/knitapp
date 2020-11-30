import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from 'react-router-dom'

import { Container, Divider } from 'semantic-ui-react'

import Swap from './Swap'
import Withdraw from './Withdraw'

function NoMatch() {
    let location = useLocation()

    return (
        <Container text>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
        </Container>
    )
}

function App() {
    return (
        <Container text>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Swap />
                    </Route>
                    <Route exact path="/withdraw">
                        <Withdraw />
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
