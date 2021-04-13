import React, { useState, createContext } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'

// Create Context Object
export const CounterContext = createContext()

// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
    const [connectWallet, setConnectWallet] = useState(
        reactLocalStorage.get('connectWallet', null)
    )
    const [network, setNetwork] = React.useState(
        reactLocalStorage.get('network', false)
    )
    const [networkName, setNetworkName] = React.useState(
        reactLocalStorage.getObject('networkName', {
            networkName: 'connect network',
            networkStatus: false
        })
    )
    const [chainName, setChainName] = React.useState(
        reactLocalStorage.get('chainName', '')
    )

    React.useEffect(() => {
        reactLocalStorage.set('connectWallet', connectWallet)
        reactLocalStorage.set('network', network)
        reactLocalStorage.setObject('networkName', networkName)
        reactLocalStorage.set('chainName', chainName)
    }, [connectWallet, network, networkName, chainName])

    return (
        <CounterContext.Provider
            value={[
                connectWallet,
                setConnectWallet,
                network,
                setNetwork,
                networkName,
                setNetworkName,
                chainName,
                setChainName
            ]}>
            {props.children}
        </CounterContext.Provider>
    )
}
