import * as React from 'react'
import {
    Header,
    Input,
    Dropdown,
    Button,
    Form,
    Checkbox,
    Segment,
    Icon,
    Message,
    Grid,
    Statistic,
    Label
} from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { swap, depositstatus } from './actions'
import { options } from './utils'

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
    const { handleSubmit, control, errors, reset } = useForm()
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
        setAmount(values.amount)
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
                        console.log(val.data.data.status)
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
                    <Grid.Column width={8}>
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

                        <Form
                            inverted
                            onSubmit={handleSubmit(onSubmitHandler)}
                            name={'swap'}>
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
                                                    onChange={(e, data) =>
                                                        setCoin(data.value)
                                                    }
                                                />
                                            }
                                            onChange={onChange}
                                            type="number"
                                            onBlur={onBlur}
                                            labelPosition="right"
                                            size="huge"
                                            value={value}
                                            placeholder="Amount"
                                        />
                                    </Form.Field>
                                )}
                            />

                            <Controller
                                control={control}
                                name="depositWallet"
                                defaultValue={''}
                                rules={{ required: true }}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            size="huge"
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
                                            size="huge"
                                            placeholder="Your ETH Address"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    </Form.Field>
                                )}
                            />

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

                            <Form.Field>
                                <div>
                                    <Button
                                        primary
                                        size="huge"
                                        loading={loading}
                                        disabled={status}>
                                        EXCHANGE
                                    </Button>
                                    <Button secondary size="huge" type="reset">
                                        RESET
                                    </Button>
                                </div>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div className="centermiddle whatyouget">
                            <p>You will recive</p>
                            <Statistic inverted color="violet">
                                <Statistic.Value>~20.06</Statistic.Value>
                                <Statistic.Label>
                                    <span
                                        aria-label="Knit XLM"
                                        data-balloon-pos="up">
                                        kXLM
                                    </span>
                                </Statistic.Label>
                            </Statistic>
                            <Label color="violet">
                                0xB26b668120f20D31e1c5c6C634Ec36D28c2FAfFa
                            </Label>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    {status && (
                        <Segment inverted placeholder>
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
