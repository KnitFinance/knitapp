import React from 'react'
import { Button, Message, Statistic, Label } from 'semantic-ui-react'
import { isMetamask, getTokanBalance } from './utils'

const ConnectMetamask = ({ coin }) => {
    const [isMeta, setIsMeta] = React.useState(true)
    const [isMetamaskEnabled, setIsMetamaskEnabled] = React.useState(false)
    const [selectedAccount, setSelectedAccount] = React.useState(null)
    const [tokenBalance, setTokanBalance] = React.useState(0)

    React.useEffect(() => {
        const getBalance = (coin, account) => {
            getTokanBalance(coin, account).then(balance => {
                setTokanBalance(balance)
            })
        }
        const getAccount = () => {
            const { ethereum } = window
            ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    getBalance(coin, accounts[0])
                    setSelectedAccount(accounts[0])
                })
        }

        if (!isMetamask()) {
            setIsMeta(false)
        } else {
            if (window.ethereum.isConnected()) {
                getAccount()
                setIsMetamaskEnabled(true)
            }
            window.ethereum.on('accountsChanged', function(accounts) {
                setSelectedAccount(accounts[0])
            })
        }
    }, [isMeta, selectedAccount, coin])

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
                        <Statistic.Value>{tokenBalance}</Statistic.Value>
                        <Statistic.Label>
                            <span aria-label="Knit XLM" data-balloon-pos="up">
                                K-{coin}
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
