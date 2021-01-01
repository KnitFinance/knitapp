import React from 'react'
import { Button, Message, Statistic, Label } from 'semantic-ui-react'
import { isMetamask } from './utils'

const ConnectMetamask = () => {
    const [isMeta, setIsMeta] = React.useState(true)
    const [isMetamaskEnabled, setIsMetamaskEnabled] = React.useState(false)
    const [selectedAccount, setSelectedAccount] = React.useState(null)

    React.useEffect(() => {
        if (!isMetamask()) {
            setIsMeta(false)
        } else {
            if (window.ethereum.isConnected()) {
                getAccount()
                setIsMetamaskEnabled(true)
            }
            //OnChange account event
            window.ethereum.on('accountsChanged', function(accounts) {
                setSelectedAccount(accounts[0])
            })
        }
    }, [isMeta, selectedAccount])

    const getAccount = () => {
        const { ethereum } = window
        ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            setSelectedAccount(accounts[0])
        })
    }
    return (
        <div className="whatyouget">
            {!isMeta && !isMetamaskEnabled && (
                <Message warning>
                    <Message.Header>Connect MetaMask!</Message.Header>
                    <p>
                        Please install an Ethereum-compatible browser or
                        extension like MetaMask to use this dApp!.
                    </p>
                </Message>
            )}
            {isMeta && !isMetamaskEnabled && (
                <Message info>
                    <Message.Header>Connect MetaMask!</Message.Header>
                    <p>Please connect MetaMask for withdrawal!</p>
                </Message>
            )}
            {isMeta && !isMetamaskEnabled && (
                <Button color="green">Connect MetaMask</Button>
            )}
            {isMeta && isMetamaskEnabled && (
                <div className="centermiddle whatyouget">
                    <p>You are connected to MetaMask</p>
                    <Statistic inverted color="violet">
                        <Statistic.Value>~20.06</Statistic.Value>
                        <Statistic.Label>
                            <span aria-label="Knit XLM" data-balloon-pos="up">
                                kXLM
                            </span>
                        </Statistic.Label>
                    </Statistic>
                    <Label color="violet">{selectedAccount}</Label>
                </div>
            )}
        </div>
    )
}

export default ConnectMetamask
