import * as React from 'react'

import { Button, Form, Input, Message, Modal } from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form'
import { addMerchantLimit, getMerchantLimit } from '../actions'
import { reactLocalStorage } from 'reactjs-localstorage'

const Web3Utils = require('web3-utils')

const LimitForm = ({ coin, wallet, reload, setReload }) => {
    const { handleSubmit, control, errors } = useForm()
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [limit, setLimit] = React.useState({})
    const [network, setNetwork] = React.useState(
        reactLocalStorage.get('network', 'BSC')
    )

    React.useEffect(() => {
        getMerchantLimit(coin, wallet, network).then(res => {
            setLimit(res.data.data.limit)
        })
    }, [coin, wallet])

    const onSubmit = async values => {
        setIsLoading(true)
        values.coin = coin
        values.network = network
        try {
            await addMerchantLimit(values)
            setReload(!reload)
        } catch (e) {
            console.log(e)
        }
        setOpen(false)
        setIsLoading(false)
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Limit</Button>}>
            <Modal.Header>Set Merchant Limit - {coin}</Modal.Header>
            <Modal.Content>
                <pre>
                    Current Limit: {limit} ({Web3Utils.fromWei(limit, 'ether')}
                    {` ${coin} `}
                    tokens)
                </pre>
                <hr />

                <Form onSubmit={handleSubmit(onSubmit)} name={'limit_form'}>
                    <Controller
                        control={control}
                        name="wallet"
                        defaultValue={wallet}
                        render={({ onChange, onBlur, value, ref }) => (
                            <Form.Field>
                                <label>Ethereum Address</label>
                                <Input
                                    type="text"
                                    value={value}
                                    inputRef={ref}
                                    onChange={onChange}
                                    placeholder="0x0000000000000000000000000000000000000000"
                                    readOnly
                                />
                                {errors && errors.address && (
                                    <Message size="small" color="red">
                                        Please enter a valid ethereum address
                                    </Message>
                                )}
                            </Form.Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="limit"
                        defaultValue={''}
                        rules={{
                            required: true
                        }}
                        render={({ onChange, onBlur, value, ref }) => (
                            <Form.Field>
                                <label>Limit</label>
                                <Input
                                    type="number"
                                    value={value}
                                    inputRef={ref}
                                    onChange={onChange}
                                    placeholder="Enter Limit"
                                />
                                {errors && errors.address && (
                                    <Message size="small" color="red">
                                        Please enter a valid limit
                                    </Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Button primary type="submit" loading={isLoading}>
                        Submit
                    </Button>
                    <Button color="black" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default LimitForm
