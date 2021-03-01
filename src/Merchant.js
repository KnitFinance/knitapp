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
import { addMerchant, getMerchant, getMerchantLimit } from './actions'
import { Controller, useForm } from 'react-hook-form'
import LimitForm from './components/LimitForm'
import { optionsWithdraw } from './utils'

const Web3 = require('web3')
let web3 = new Web3('ws://localhost:8545')

const Transactions = () => {
    const [items, setItems] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [token, setToken] = React.useState('XLM')

    const {
        handleSubmit,
        control,
        errors,
        reset,
        setValue,
        setError
    } = useForm()

    React.useEffect(() => {
        getMerchant('all').then(res => {
            // const resMapped = res.data.data.balance.map((bal, ind) => {
            //     getMerchantLimit(bal.coin, bal.wallet).then(result => {
            //         bal.limit = result.data.limit
            //         console.log(result.data.limit)
            //         return bal
            //     })
            // })
            setItems(res.data.data.merchants)
        })
    }, [])

    const onSubmit = async values => {
        values.coin = token
        try {
            const { data } = await addMerchant(values)
        } catch (e) {
            console.log('err', e)
        }
        console.log(values)
    }

    const listItems = items.map((item, index) => (
        <Table.Row key={index} inverted>
            <Table.Cell collapsing>{item.wallet}</Table.Cell>
            <Table.Cell>{item.coin}</Table.Cell>
            <Table.Cell collapsing textAlign="right"></Table.Cell>
            <Table.Cell collapsing textAlign="right">
                <LimitForm wallet={item.wallet} coin={item.coin} />
            </Table.Cell>
        </Table.Row>
    ))

    return (
        <React.Fragment>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">
                            Merchants
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Button onClick={() => setOpen(!open)}>
                                Add Merchant
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Wallet</Table.HeaderCell>
                        <Table.HeaderCell>Coin</Table.HeaderCell>
                        <Table.HeaderCell>Limit</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listItems}
                    {items.length === 0 && (
                        <Table.Row>
                            <Table.Cell>No merchant yet!</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}>
                <Modal.Header>Add Merchant</Modal.Header>
                <Modal.Content>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        name={'add_merchant'}>
                        <Controller
                            control={control}
                            name="wallet"
                            defaultValue={''}
                            rules={{
                                required: true,
                                validate: value => web3.utils.isAddress(value)
                            }}
                            render={({ onChange, onBlur, value, ref }) => (
                                <Form.Field>
                                    <label>Ethereum Address</label>
                                    <Input
                                        type="text"
                                        value={value}
                                        inputRef={ref}
                                        onChange={onChange}
                                        placeholder="0x0000000000000000000000000000000000000000"
                                    />
                                    {errors && errors.address && (
                                        <Message size="small" color="red">
                                            Please enter a valid ethereum
                                            address
                                        </Message>
                                    )}
                                </Form.Field>
                            )}
                        />
                        <Form.Field>
                            <Select
                                placeholder="Select token"
                                options={optionsWithdraw}
                                value={token}
                                onChange={(e, data) => setToken(data.value)}
                            />
                        </Form.Field>

                        <Button primary type="submit">
                            Submit
                        </Button>
                        <Button
                            onClick={() => {
                                setToken('XLM')
                                setOpen(false)
                            }}
                            secondary
                            type="reset">
                            Cancel
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </React.Fragment>
    )
}

export default Transactions
