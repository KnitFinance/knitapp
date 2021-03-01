import * as React from 'react'
import { Tab } from 'semantic-ui-react'
import Transactions from './Transactions'
import Withdrawals from './Withdrawals'
import Merchant from './Merchant'

const panes = [
    {
        menuItem: 'Minter',
        render: () => (
            <Tab.Pane attached={false} inverted>
                <Merchant />
            </Tab.Pane>
        )
    },
    {
        menuItem: 'Transactions',
        render: () => (
            <Tab.Pane attached={false} inverted>
                <Transactions />
            </Tab.Pane>
        )
    },
    {
        menuItem: 'Withdrawals',
        render: () => (
            <Tab.Pane attached={false} inverted>
                <Withdrawals />
            </Tab.Pane>
        )
    }
]

const AdminNav = () => {
    return (
        <Tab
            menu={{ secondary: true, pointing: true, inverted: true }}
            panes={panes}
        />
    )
}

export default AdminNav
