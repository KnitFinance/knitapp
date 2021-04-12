import * as React from 'react'
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Message,
    Select
} from 'semantic-ui-react'
import { addMerchant, getMerchant } from './actions'
import { Controller, useForm } from 'react-hook-form'
import LimitForm from './components/LimitForm'
import { optionsWithdraw } from './utils'
import { reactLocalStorage } from 'reactjs-localstorage'

const Web3Utils = require('web3-utils')

const History = () => {
    const [items, setItems] = React.useState([])
    const [token, setToken] = React.useState('XLM')
    const [reload, setReload] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [network, setNetwork] = React.useState(
        reactLocalStorage.get('network', 'BSC')
    )

    const {
        handleSubmit,
        control,
        errors,
        reset,
        setValue,
        setError
    } = useForm()

    React.useEffect(() => {}, [])

    const listItems = items.map((item, index) => (
        <Table.Row key={index} inverted>
            <Table.Cell collapsing>{item.wallet}</Table.Cell>
            <Table.Cell>{item.coin}</Table.Cell>
            <Table.Cell collapsing textAlign="right">
                <LimitForm
                    wallet={item.wallet}
                    coin={item.coin}
                    reload={reload}
                    setReload={setReload}
                />
            </Table.Cell>
        </Table.Row>
    ))

    return (
        <React.Fragment>
            <Table celled striped inverted={true}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">History</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Wallet</Table.HeaderCell>
                        <Table.HeaderCell>Coin</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
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
