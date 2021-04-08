import * as React from 'react'

import { Container, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <Container className="fixed">
            <Menu text inverted>
                <Menu.Item header as={NavLink} exact to="/" children="Home" />
            </Menu>
            <p className="footer text">
                Unlocking Full Potential of DeFi Using Cross Chain Synthetics
                and Bridges.
            </p>
        </Container>
    )
}

export default Footer
