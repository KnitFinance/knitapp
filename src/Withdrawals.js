import * as React from 'react'
import { Header, Icon, Table, Label } from 'semantic-ui-react'
import { getWithdraw } from './actions'

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

function Withdrawals() {
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        getWithdraw().then(res => {
            setItems(res.data.data.result)
        })
    }, [])
    console.log(items)

    const listItems = items.map((item, index) => (
        <Table.Row key={index} inverted>
            <Table.Cell collapsing>
                {truncate(item.walletTo, 16, '...')}
            </Table.Cell>
            <Table.Cell>{item.createdAt}</Table.Cell>
            <Table.Cell collapsing textAlign="right">
                {item.amount}
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
                {item.coin}
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
                {`${item.amount} k${item.coin}`}
            </Table.Cell>
            <Table.Cell collapsing>
                <a
                    target="_blank"
                    href={`https://kovan.etherscan.io/tx/${item.txnId}`}>
                    {truncate(item.txnId, 8, '...')}
                </a>
            </Table.Cell>

            <Table.Cell collapsing>
                {item.status && (
                    <Label size="mini" color="green">
                        Confirm
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
                            Withdrawals
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Receiving Wallet</Table.HeaderCell>
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
                            <Table.Cell>No withdrawals yet!</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default Withdrawals
