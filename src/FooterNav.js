import * as React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function FooterNav() {
    return (
        <Menu className={'screennav'} inverted pointing secondary size="huge">
            <Menu.Item active={true}>
                <NavLink to="/" activeClassName="active">
                    Home
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/withdraw" activeClassName={'active'}>
                    Withdraw
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/admin" activeClassName={'active'}>
                    Sign In
                </NavLink>
            </Menu.Item>
        </Menu>
    )
}

export default FooterNav
