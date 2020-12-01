import * as React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { UserContext } from './actions/userContext'

const FooterNav = () => {
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
            <UserContext.Consumer>
                {({ user }) => (
                    <Menu.Item>
                        {user === null ? (
                            <NavLink to="/admin" activeClassName={'active'}>
                                Sign In
                            </NavLink>
                        ) : (
                            <NavLink to="/admin" activeClassName={'active'}>
                                My Account
                            </NavLink>
                        )}
                    </Menu.Item>
                )}
            </UserContext.Consumer>
        </Menu>
    )
}

export default FooterNav
