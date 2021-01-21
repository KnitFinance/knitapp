import * as React from 'react'
import { Table, Label } from 'semantic-ui-react'
import { getSwap } from './actions'

const truncate = (str, max, sep) => {
    max = max || 6

    var len = str.length
    if (len > max) {
        sep = sep || '...'
        var seplen = sep.length
        if (seplen > max) {
            return str.substr(len - max)
        }
        var n = -0.5 * (max - len - seplen)
        var center = len / 2

        var front = str.substr(0, center - n)
        var back = str.substr(len - center + n)
        return front + sep + back
    }

    return str
}

const Transactions = () => {
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        getSwap().then(res => {
            setItems(res.data.data.result)
        })
    }, [])

    console.log(items)

    const listItems = items.map((item, index) => (
        <Table.Row key={index} inverted>
            <Table.Cell collapsing>{item.ethWallet}</Table.Cell>
            <Table.Cell>{item.createdAt}</Table.Cell>
            <Table.Cell collapsing textAlign="right">
                {item.amount}
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
                {item.currency}
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
                {`${item.tokens} k${item.currency}`}
            </Table.Cell>
            <Table.Cell collapsing>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://kovan.etherscan.io/tx/${item.txnId}`}>
                    {truncate(item.txnId, 8, '...')}
                </a>
            </Table.Cell>

            <Table.Cell collapsing>
                {item.isDeposit && item.status && (
                    <Label size="mini" color="green">
                        Confirm
                    </Label>
                )}
                {item.isDeposit && !item.status && (
                    <Label size="mini" color="blue">
                        Deposit
                    </Label>
                )}
                {!item.isDeposit && !item.status && (
                    <Label size="mini" color="black">
                        Waiting
                    </Label>
                )}
            </Table.Cell>
        </Table.Row>
    ))

    return (
        <React.Fragment>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="7">
                            Transactions
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Wallet</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Coin</Table.HeaderCell>
                        <Table.HeaderCell>Tokens</Table.HeaderCell>
                        <Table.HeaderCell>Explorer</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listItems}
                    {items.length === 0 && (
                        <Table.Row>
                            <Table.Cell>No transaction yet!</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default Transactions
