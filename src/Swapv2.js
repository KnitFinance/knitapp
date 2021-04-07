import * as React from 'react'

import {
    Button,
    Checkbox,
    Divider,
    Dropdown,
    Form,
    Icon,
    Input,
    Message,
    Segment,
    Statistic
} from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form'
import { depositstatus, swap, swapVerify } from './actions'
import { options, optionsWithdraw } from './utils'

import { reactLocalStorage } from 'reactjs-localstorage'

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

const Swapv2 = () => {
    const {
        handleSubmit,
        control,
        errors,
        reset,
        setValue,
        setError,
        getValue
    } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [status, setStatus] = React.useState(false)
    const [txid, setTxid] = React.useState(null)
    const [isTxid, setIsTxid] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [deposit, setDeposit] = React.useState(false)
    const [time, setTime] = React.useState(null)
    const [coin, setCoin] = React.useState('ETH')
    const [token, setToken] = React.useState(null)
    const [enterAmount, setEnterAmount] = React.useState(null)
    const [transaction, setTransaction] = React.useState(null)
    var HALF_HOUR = 60 * 30 * 1000
    const [network, setNetwork] = React.useState(
        reactLocalStorage.get('network', 'BSC')
    )

    const onSubmitHandler = async values => {
        setLoading(true)
        setVisible(false)
        values.coin = coin
        values.network = network
        if (values.coin) {
            values.depositWallet = '0x0000000000000000000000000000000000000000'
        }
        try {
            const { data } = await swap(values)

            if (values.coin === 'ETH') {
                const values = {
                    txnId: data.data.txnId,
                    amount: data.data.amount,
                    ethWallet: data.data.ethWallet,
                    coin: data.data.coin,
                    network: network,
                    hdWallet: data.data.hdWallet
                }
                await swapVerify(values)
            }
            setTransaction(data.data)
            setTime(new Date())
            setStatus(true)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    const onTransactionHandler = async () => {
        const values = {
            txnId: transaction.txnId,
            txnhash: txid,
            amount: transaction.amount,
            ethWallet: transaction.ethWallet,
            coin: transaction.coin,
            depositWallet: transaction.depositWallet,
            wallet: transaction.wallet,
            network: network
        }

        try {
            await swapVerify(values)
            setIsTxid(true)
        } catch (e) {
            console.log(e)
        }
    }
    const dismissHandle = () => setVisible(false)

    useInterval(
        () => {
            if (transaction !== null) {
                depositstatus(transaction.txnId)
                    .then(val => {
                        console.log('Deposit Status', val.data.data.status)
                        if (val.data.data.status === true) {
                            setDeposit(val.data.data)
                            setStatus(false)
                            setVisible(true)
                            reset()
                        }
                        if (new Date() - time >= HALF_HOUR) {
                            setStatus(false)
                            setTime(null)
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
            <Divider hidden />
            <Form
                inverted
                className="centermiddleswap swapv2"
                onSubmit={handleSubmit(onSubmitHandler)}
                name={'swap'}>
                <div className="tab-middle">
                    <Button.Group>
                        <Button
                            color={network === 'ETH' ? 'black' : 'grey'}
                            type="button"
                            onClick={() => {
                                setNetwork('ETH')
                                reactLocalStorage.set('network', 'ETH')
                            }}>
                            Ethereum
                        </Button>
                        <Button.Or />
                        <Button
                            className="maticbtn"
                            color={network === 'BSC' ? 'black' : 'grey'}
                            type="button"
                            onClick={() => {
                                setNetwork('BSC')
                                reactLocalStorage.set('network', 'BSC')
                            }}>
                            BSC
                        </Button>
                        <Button.Or />
                        <Button
                            className="maticbtn"
                            color={network === 'MATIC' ? 'black' : 'grey'}
                            type="button"
                            onClick={() => {
                                setNetwork('MATIC')
                                reactLocalStorage.set('network', 'MATIC')
                            }}>
                            Matic
                        </Button>
                    </Button.Group>
                </div>
                <Divider hidden />
                <Controller
                    control={control}
                    name="amount"
                    defaultValue={''}
                    rules={{ required: true }}
                    render={({ onChange, onBlur, value, ref }) => (
                        <Form.Field>
                            <label>First Name</label>
                            <Input
                                label={
                                    <Dropdown
                                        options={options}
                                        size="large"
                                        defaultValue={coin}
                                        onChange={(e, data) => {
                                            setCoin(data.value)
                                        }}
                                    />
                                }
                                onChange={onChange}
                                type="number"
                                onBlur={e => {
                                    const commission =
                                        (e.target.value / 100) * 0.25
                                    const minimumAmount = 0.0000001
                                    const numberOfToken =
                                        e.target.value -
                                        (commission + minimumAmount)

                                    if (numberOfToken < 0) {
                                        setError('token', {
                                            type: 'manual',
                                            message: 'Minimum amount required!'
                                        })
                                    } else {
                                        setToken(numberOfToken)
                                        setEnterAmount(e.target.value)
                                        setValue('token', numberOfToken, {
                                            shouldDirty: true
                                        })
                                    }
                                }}
                                labelPosition="right"
                                size="large"
                                value={value}
                                placeholder="Sending Amount"
                            />
                        </Form.Field>
                    )}
                />
                {coin !== 'ETH' && (
                    <Controller
                        control={control}
                        name="depositWallet"
                        defaultValue={''}
                        rules={{ required: true, minLength: 10 }}
                        render={({ onChange, onBlur, value, ref }) => (
                            <Form.Field>
                                <Input
                                    size="large"
                                    placeholder="Your Sending Address"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    fluid
                                />
                            </Form.Field>
                        )}
                    />
                )}
                <Controller
                    control={control}
                    name="ethWallet"
                    defaultValue={''}
                    rules={{ required: true, minLength: 10 }}
                    render={({ onChange, onBlur, value, ref }) => (
                        <Form.Field>
                            <Input
                                action="Connect Wallet"
                                size="large"
                                placeholder={`Your ${network} Address`}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                fluid
                            />
                        </Form.Field>
                    )}
                />
                {coin === 'XLM' && (
                    <Controller
                        control={control}
                        name="memo"
                        defaultValue={''}
                        rules={{ required: true }}
                        render={({ onChange, onBlur, value, ref }) => (
                            <Form.Field>
                                <Input
                                    size="large"
                                    placeholder="Memo"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            </Form.Field>
                        )}
                    />
                )}

                <Controller
                    control={control}
                    name="terms"
                    rules={{ required: true }}
                    defaultValue={false}
                    render={({ onChange, onBlur, value, name, ref }) => (
                        <Form.Field>
                            <Checkbox
                                onBlur={onBlur}
                                onChange={e => onChange(!value)}
                                checked={value}
                                inputRef={ref}
                                label={
                                    <label>
                                        I agree to the{' '}
                                        <a href="https://knit.finance">terms</a>{' '}
                                        and{' '}
                                        <a href="https://knit.finance">
                                            privacy policy
                                        </a>{' '}
                                    </label>
                                }
                            />
                        </Form.Field>
                    )}
                />

                {Object.keys(errors).length > 0 && (
                    <>
                        {errors.token ? (
                            <Message
                                color="red"
                                inverted
                                header="There was some errors with your submission"
                                list={[`${errors.token.message}`]}
                            />
                        ) : (
                            <Message
                                color="red"
                                inverted
                                header="There was some errors with your submission"
                                list={[`All fields are required!`]}
                            />
                        )}
                    </>
                )}
                <Divider hidden />

                <Form.Field>
                    <div>
                        <Button
                            basic
                            color="green"
                            size="medium"
                            loading={loading}
                            disabled={status}>
                            EXCHANGE
                        </Button>
                        <Button basic color="red" size="medium" type="reset">
                            RESET
                        </Button>
                    </div>
                </Form.Field>
                <Divider hidden />
            </Form>
            {token !== null && enterAmount != null && (
                <div className="centermiddleswap swapdetails">
                    <div className="resltul">
                        <p>Asset Expected</p>
                        <p>{coin}</p>
                    </div>

                    <div className="resltul">
                        <p>{`Expected ${coin} value`}</p>
                        <p>{enterAmount}</p>
                    </div>
                    <div className="resltul">
                        <p>Transaction Fee</p>
                        <p className="ui green">0.25%</p>
                    </div>
                    <div className="resltul">
                        <p>{`K${coin}`}</p>
                        <p>{token}</p>
                    </div>
                </div>
            )}

            {status && (
                <div className="centermiddleswap swapv2">
                    <Segment.Group>
                        <Segment>
                            <div className="row-details">
                                <div>
                                    <h3>Transaction Details</h3>
                                </div>
                                <div>
                                    {(isTxid || coin === 'ETH') && (
                                        <Icon loading name="sync" />
                                    )}
                                </div>
                            </div>
                        </Segment>
                        {coin === 'ETH' ? (
                            <>
                                <Segment>
                                    <div className="row-details">
                                        <div>Address</div>
                                        <div>{transaction.hdWallet}</div>
                                    </div>
                                </Segment>
                                <Message warning attached="bottom">
                                    <Icon name="info" />
                                    Send your ETH to this address
                                </Message>
                            </>
                        ) : (
                            <>
                                <Segment>
                                    <div className="row-details">
                                        <div>Wallet</div>
                                        <div>{transaction.wallet}</div>
                                    </div>
                                </Segment>
                                <Segment>
                                    <div className="row-details">
                                        <div>Memo</div>
                                        <div>{transaction.memo}</div>
                                    </div>
                                </Segment>
                                <Segment>
                                    <div className="row-details">
                                        <div>Transaction ID </div>
                                        <div>
                                            {!isTxid ? (
                                                <Form
                                                    onSubmit={
                                                        onTransactionHandler
                                                    }>
                                                    <Form.Field>
                                                        <Input
                                                            action="Submit"
                                                            placeholder="Transaction hash"
                                                            onChange={val =>
                                                                setTxid(
                                                                    val.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </Form.Field>
                                                </Form>
                                            ) : (
                                                <>{txid}</>
                                            )}
                                        </div>
                                    </div>
                                </Segment>
                                {!isTxid && (
                                    <Message warning attached="bottom">
                                        <Icon name="info" />
                                        Submit your transaction hash to complete
                                        this transaction
                                    </Message>
                                )}
                            </>
                        )}
                    </Segment.Group>
                </div>
            )}
            {visible && (
                <Message
                    positive
                    inverted
                    onDismiss={dismissHandle}
                    header="Success!"
                    list={[
                        `You will receive ${deposit.tokens} k${deposit.coin} with in few minutes`,
                        `Received wallet ${deposit.ethWallet}`,
                        `Token address ${transaction?.contractAddress}`
                    ]}
                />
            )}
        </React.Fragment>
    )
}

export default Swapv2
