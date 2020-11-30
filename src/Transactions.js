import * as React from 'react'
import { Header, Icon, Table, Label } from 'semantic-ui-react'

import AdminNav from './AdminNav'

function truncate(str, max, sep) {
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

function Transactions() {
    return (
        <React.Fragment>
            <AdminNav />

            <Table celled striped inverted>
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
                    <Table.Row>
                        <Table.Cell collapsing>
                            {truncate(
                                '0xd42dD0BDadA11B2865A4a0b019BBca671116F2c7',
                                16,
                                '...'
                            )}
                        </Table.Cell>
                        <Table.Cell>{Date().substring(4, 16)}</Table.Cell>
                        <Table.Cell collapsing textAlign="right">
                            12.0844
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="right">
                            XLM
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="right">
                            {`11.99 kXLM`}
                        </Table.Cell>
                        <Table.Cell collapsing>
                            <a
                                target="_blank"
                                href="https://etherscan.io/address/0x788231f6f148004eaaa2413953bc362e95c28c8f">
                                {truncate(
                                    '0x41a1f081b393af8c23986d8ea53f2ac6f57222fdc4265170d9f6fb1b2ffd5dfa',
                                    8,
                                    '...'
                                )}
                            </a>
                        </Table.Cell>

                        <Table.Cell collapsing>
                            <Label size="mini" color="blue">
                                Deposit
                            </Label>
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell collapsing>
                            {truncate(
                                '0xd42dD0BDadA11B2865A4a0b019BBca67111',
                                16,
                                '...'
                            )}
                        </Table.Cell>
                        <Table.Cell>{Date().substring(4, 16)}</Table.Cell>
                        <Table.Cell collapsing textAlign="right">
                            0.083
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="right">
                            XRP
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="right">
                            {`0.082 kXRP`}
                        </Table.Cell>
                        <Table.Cell collapsing>
                            <a
                                target="_blank"
                                href="https://etherscan.io/address/0x788231f6f148004eaaa2413953bc362e95c28c8f">
                                {truncate(
                                    '0x41a1f081b393af8c23986d8ea53f2ac6f57222fdc426517fa',
                                    8,
                                    '...'
                                )}
                            </a>
                        </Table.Cell>

                        <Table.Cell collapsing>
                            <Label size="mini" color="green">
                                Confirm
                            </Label>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default Transactions
