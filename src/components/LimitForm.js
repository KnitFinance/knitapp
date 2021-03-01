import * as React from 'react'

import { Button, Form, Input, Message, Modal } from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form'
import { addMerchantLimit } from '../actions'

const LimitForm = ({ coin, wallet }) => {
    const { handleSubmit, control, errors } = useForm()
    const [open, setOpen] = React.useState(false)
    const onSubmit = async values => {
        values.coin = coin
        try {
            const res = await addMerchantLimit(values)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}>
            <Modal.Header>Add Merchant Limit - {coin}</Modal.Header>
            <Modal.Content>
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

                    <Button primary type="submit">
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
