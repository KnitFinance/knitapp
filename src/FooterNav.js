import * as React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { UserContext } from './actions/userContext'

const FooterNav = () => {
    return (
        <Menu className={'screennav'} inverted pointing secondary size="huge">
            <Menu.Item header as={NavLink} exact to="/" children="Home" />
            <Menu.Item
                header
                as={NavLink}
                exact
                to="/withdraw"
                children="Withdraw"
            />

            <UserContext.Consumer>
                {({ user, logout }) => (
                    <>
                        {user === null ? (
                            <Menu.Item
                                header
                                as={NavLink}
                                exact
                                to="/admin"
                                children="Sign In"
                            />
                        ) : (
                            <>
                                <Menu.Item
                                    header
                                    as={NavLink}
                                    exact
                                    to="/admin"
                                    children="Admin"
                                />
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
