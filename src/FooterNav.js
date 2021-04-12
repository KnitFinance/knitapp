import * as React from 'react'

import { Button, Menu, Segment, Statistic, Dropdown } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'
import { UserContext } from './actions/userContext'
import { CounterContext } from './context'
import { truncate } from './utils'
import { networkNames, contractNetwork, allChain, chainNames } from './utils'

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
    console.log(connectWallet, network, networkName, chainName)

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
            size="huge">
            <Menu.Item header as={NavLink} exact to="/" children="Home" />
            <Menu.Item
                header
                as={NavLink}
                exact
                to="/withdraw"
                children="Withdraw"
            />
            {connectWallet === null ? (
                <Menu.Item>
                    <Button
                        basic
                        color="green"
                        size="medium"
                        type="button"
                        onClick={connectMetamask}>
                        Connect Wallet
                    </Button>
                </Menu.Item>
            ) : (
                <Dropdown
                    item
                    text={truncate(
                        '0x4abD3D3817a86D11416dD370e37aDE95a0FbdCCa',
                        12
                    )}>
                    <Dropdown.Menu>
                        <Dropdown.Item>History</Dropdown.Item>
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
