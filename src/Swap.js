import * as React from 'react'

import {
    Button,
    Checkbox,
    Divider,
    Dropdown,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Message,
    Segment
} from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form'
import { depositstatus, swap } from './actions'

import { options, optionsWithdraw } from './utils'

const useInterval = (callback, delay) => {
    const savedCallback = React.useRef(() => {})
    // Remember the latest callback.
    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

const Swap = () => {
    const { handleSubmit, control, errors, reset, setValue } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [status, setStatus] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [deposit, setDeposit] = React.useState(false)

    const [coin, setCoin] = React.useState('ETH')
    const [amount, setAmount] = React.useState('')

    const [transaction, setTransaction] = React.useState(null)

    const onSubmitHandler = async values => {
        setLoading(true)
        setVisible(false)
        setAmount(values.token)
        values.coin = coin

        try {
            const { data } = await swap(values)
            setTransaction(data.data)
            setStatus(true)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    const dismissHandle = () => setVisible(false)

    useInterval(
        () => {
            if (transaction !== null) {
                depositstatus(transaction.txId)
                    .then(val => {
                        if (val.data.data.status === true) {
                            setDeposit(val.data.data)
                            setStatus(false)
                            setVisible(true)
                            reset()
                        }
                    })
                    .catch(err => setLoading(false))
            }
        },
        status ? 10000 : null
    )

    return (
        <React.Fragment>
            <Grid>
                <Grid.Row>
                    <Form
                        inverted
                        className="centermiddle"
                        onSubmit={handleSubmit(onSubmitHandler)}
                        name={'swap'}>
                        <div className="centermiddle">
                            <Button.Group>
                                <Button color="violet">Ethereum</Button>
                                <Button.Or />
                                <Button
                                    className="maticbtn"
                                    aria-label="Coming Soon"
                                    data-balloon-pos="up">
                                    Matic
                                </Button>
                            </Button.Group>
                        </div>
                        <Divider hidden />
                        <Divider hidden />

                        <Form.Group>
                            <Controller
                                control={control}
                                name="amount"
                                defaultValue={''}
                                rules={{ required: true }}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            label={
                                                <Dropdown
                                                    options={options}
                                                    size="huge"
                                                    defaultValue={coin}
                                                    onChange={(e, data) => {
                                                        setCoin(data.value)
                                                    }}
                                                />
                                            }
                                            onChange={onChange}
                                            type="number"
                                            onBlur={e =>
                                                setValue(
                                                    'token',
                                                    (e.target.value / 100) *
                                                        97.5,
                                                    { shouldDirty: true }
                                                )
                                            }
                                            labelPosition="right"
                                            size="huge"
                                            value={value}
                                            placeholder="Sending Amount"
                                        />
                                    </Form.Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name="token"
                                defaultValue={''}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            label={
                                                <Dropdown
                                                    options={optionsWithdraw}
                                                    size="huge"
                                                    value={coin}
                                                />
                                            }
                                            type="text"
                                            labelPosition="right"
                                            size="huge"
                                            value={`~${value}`}
                                            placeholder="Receiving Amount"
                                            readOnly
                                        />
                                    </Form.Field>
                                )}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Controller
                                control={control}
                                name="depositWallet"
                                defaultValue={''}
                                rules={{ required: true }}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            size="large"
                                            placeholder="Your Sending Address"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    </Form.Field>
                                )}
                            />

                            <Controller
                                control={control}
                                name="ethWallet"
                                defaultValue={''}
                                rules={{ required: true }}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            size="large"
                                            placeholder="Your ETH Address"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    </Form.Field>
                                )}
                            />
                        </Form.Group>

                        <Controller
                            control={control}
                            name="terms"
                            rules={{ required: true }}
                            defaultValue={false}
                            render={({
                                onChange,
                                onBlur,
                                value,
                                name,
                                ref
                            }) => (
                                <Form.Field>
                                    <Checkbox
                                        onBlur={onBlur}
                                        onChange={e => onChange(!value)}
                                        checked={value}
                                        inputRef={ref}
                                        label="I agree to the terms and privacy policy"
                                    />
                                </Form.Field>
                            )}
                        />

                        {Object.keys(errors).length > 0 && (
                            <Message
                                color="red"
                                inverted
                                header="There was some errors with your submission"
                                list={[`All fields are required!`]}
                            />
                        )}
                        <Divider hidden />
                        <Divider hidden />

                        <Form.Field>
                            <div>
                                <Button
                                    primary
                                    size="huge"
                                    loading={loading}
                                    disabled={status}>
                                    EXCHANGE
                                </Button>
                                <Button
                                    basic
                                    color="red"
                                    size="huge"
                                    type="reset">
                                    RESET
                                </Button>
                            </div>
                        </Form.Field>
                    </Form>
                </Grid.Row>

                <Grid.Row>
                    {status && (
                        <Segment inverted placeholder style={{ width: '100%' }}>
                            <Header icon>
                                <Icon loading name="certificate" />
                                {transaction && (
                                    <>
                                        <pre>{transaction.walletAddress}</pre>

                                        <Header inverted as="h3">
                                            {`You will recive approximately ${amount} k${coin}`}
                                        </Header>
                                    </>
                                )}
                            </Header>
                        </Segment>
                    )}
                    {visible && (
                        <Message
                            positive
                            inverted
                            onDismiss={dismissHandle}
                            header="Success!"
                            list={[
                                `You have received ${deposit.tokens} k${deposit.coin}`,
                                `Received wallet ${deposit.ethWallet}`,
                                `Token address ${transaction.contractAddress}`
                            ]}
                        />
                    )}
                </Grid.Row>
            </Grid>
        </React.Fragment>
    )
}

export default Swap
