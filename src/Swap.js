import * as React from 'react'
import {
    Container,
    Header,
    Divider,
    Input,
    Dropdown,
    Button
} from 'semantic-ui-react'
import { Btc, Eth } from 'react-cryptocoins'

const coinOptions = [
    {
        key: 'btc',
        text: 'Bitcoin',
        value: 'Jenny Hess',
        image: <Btc size={24} />
    },
    {
        key: 'eth',
        text: 'Ethereum',
        value: 'Elliot Fu',
        image: <Eth size={24} />
    }
]
function Swap() {
    return (
        <Container text>
            <Divider hidden />
            <Header as="h2">Swap</Header>
            <Dropdown
                placeholder="Select Coin"
                selection
                options={coinOptions}
            />
            <Input placeholder="Deposit amount" />
            <Input
                icon="<Btc size={24} />"
                iconPosition="left"
                placeholder="Your ETH Wallet"
            />
            <div>
                <Button primary>Primary</Button>
                <Button secondary>Secondary</Button>
            </div>
        </Container>
    )
}

export default Swap
