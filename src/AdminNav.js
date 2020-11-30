import * as React from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'

function AdminNav() {
    return (
        <Menu inverted pointing secondary size="huge">
            <Menu.Item active={true}>
                <NavLink to="/admin/txs" activeClassName="active">
                    Transactions
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/admin/withdrawals" activeClassName={'active'}>
                    Withdrawals
                </NavLink>
            </Menu.Item>
        </Menu>
    )
}

export default AdminNav
