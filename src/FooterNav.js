import * as React from 'react'

import { Button, Dropdown, Menu, Segment, Statistic } from 'semantic-ui-react'
import { allChain, chainNames, contractNetwork, networkNames } from './utils'

import { CounterContext } from './context'
import { NavLink } from 'react-router-dom'
import { UserContext } from './actions/userContext'
import { truncate } from './utils'

const FooterNav = () => {
    const [
        connectWallet,
        setConnectWallet,
        network,
        setNetwork,
        networkName,
        setNetworkName,
        chainName,
        setChainName
    ] = React.useContext(CounterContext)
    // console.log(connectWallet, network, networkName, chainName)

    React.useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', function(accounts) {
                setConnectWallet(accounts[0])
            })
            window.ethereum.on('chainChanged', chainId => {
                const _chainId = parseInt(chainId, 16)
                const networkNm = networkNames(_chainId)
                const networkContract = contractNetwork(_chainId)
                const chainN = chainNames(_chainId)
                setChainName(chainN)
                setNetworkName(networkNm)
                setNetwork(networkContract)
            })
        }
        connectMetamask()
    }, [])

    const connectMetamask = () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    setConnectWallet(accounts[0])
                    const networkId = contractNetwork(
                        window.ethereum.networkVersion
                    )
                    setNetwork(networkId)
                    const networkN = networkNames(
                        window.ethereum.networkVersion
                    )
                    setNetworkName(networkN)
                    const chainN = chainNames(window.ethereum.networkVersion)
                    setChainName(chainN)
                })
        }
    }

    return (
        <Menu
            className={'screennav'}
            inverted="true"
            pointing
            secondary
            borderless
            size="huge">
            <Menu.Item header as={NavLink} exact to="/" children="Home" />
            <Menu.Item
                header
                as={NavLink}
                exact
                to="/withdraw"
                children="Withdraw"
            />
            {connectWallet === 'null' || connectWallet === null ? (
                <Menu.Item basic>
                    <Button
                        color="green"
                        type="button"
                        onClick={connectMetamask}>
                        Connect Wallet
                    </Button>
                </Menu.Item>
            ) : (
                <Dropdown item text={truncate(connectWallet, 14)}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/history">
                            History
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}

            <UserContext.Consumer>
                {({ user, logout }) => (
                    <>
                        {user !== null && (
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
