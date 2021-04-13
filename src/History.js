import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { CounterContext } from './context'
import { getSwapHistory } from './actions'

const Web3Utils = require('web3-utils')

const History = () => {
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
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        const getHistory = async () => {
            const result = await getSwapHistory(connectWallet)
            setItems(result.data.data.history)
        }
        getHistory()
    }, [])

    const listItems = items.map((item, index) => (
        <Table.Row key={index} inverted>
            <Table.Cell collapsing>
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric'
                })}
            </Table.Cell>
            <Table.Cell>{item.network}</Table.Cell>
            <Table.Cell>{item.currency}</Table.Cell>
            <Table.Cell>
                {item.tokens}
                <span className="small-text"> k{item.currency}</span>
            </Table.Cell>

            <Table.Cell collapsing textAlign="right">
                {item.status ? 'Completed' : 'Pending'}
            </Table.Cell>
        </Table.Row>
    ))

    return (
        <React.Fragment>
            <Table sortable celled striped inverted={true}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="5">History</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Network</Table.HeaderCell>
                        <Table.HeaderCell>Currency</Table.HeaderCell>
                        <Table.HeaderCell>Token</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listItems}
                    {items.length === 0 && (
                        <Table.Row>
                            <Table.Cell>No history yet!</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default History
