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

const Web3Utils = require('web3-utils')

const Transactions = () => {
    const [items, setItems] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [token, setToken] = React.useState('XLM')
    const [reload, setReload] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

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
            setItems(res.data.data.merchants)
        })
    }, [reload])

    const onSubmit = async values => {
        setIsLoading(true)
        values.coin = token
        try {
            const { data } = await addMerchant(values)
            setOpen(false)
        } catch (e) {
            console.log('err', e)
            setOpen(false)
        }
        setIsLoading(false)
    }

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
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="2">
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
                                validate: value => Web3Utils.isAddress(value)
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

                        <Button primary type="submit" loading={isLoading}>
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
