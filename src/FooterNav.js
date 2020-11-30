import * as React from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'

function FooterNav() {
    return (
        <Menu inverted pointing secondary size="huge">
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
