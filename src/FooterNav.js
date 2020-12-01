import * as React from 'react'
import { Menu, Button } from 'semantic-ui-react'
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
                {({ user, logout }) => (
                    <>
                        {user === null ? (
                            <Menu.Item>
                                <NavLink to="/admin" activeClassName={'active'}>
                                    Sign In
                                </NavLink>
                            </Menu.Item>
                        ) : (
                            <>
                                <Menu.Item>
                                    <NavLink
                                        to="/admin"
                                        activeClassName={'active'}>
                                        My Account
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button
                                        basic
                                        circular
                                        inverted
                                        icon="shutdown"
                                        onClick={() => logout()}
                                    />
                                </Menu.Item>
                            </>
                        )}
                    </>
                )}
            </UserContext.Consumer>
        </Menu>
    )
}

export default FooterNav
