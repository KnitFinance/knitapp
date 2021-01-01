import * as React from 'react'
import {
    Header,
    Input,
    Dropdown,
    Button,
    Form,
    Checkbox,
    Message,
    Grid
} from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { withdraw } from './actions'
import { optionsWithdraw, isMetamask } from './utils'
import ConnectMetamask from './ConnectMetamask'
const contract = require('@truffle/contract')
const contractAbi = {
    XLM: require('./abi/KnitStellar.json'),
    XRP: require('./abi/KnitRipple.json'),
    LTC: require('./abi/KnitLitecoin.json')
}

const Web3 = require('web3')

function Withdraw() {
    const { handleSubmit, control, errors, reset } = useForm()
    const [coin, setCoin] = React.useState('ETH')
    const [loading, setLoading] = React.useState()
    const [visible, setVisible] = React.useState(false)
    const [isMeta, setIsMeta] = React.useState(true)

    React.useEffect(() => {
        if (!isMetamask()) {
            setIsMeta(false)
        }
    }, [isMeta])

    const onSubmitHandler = async value => {
        setLoading(true)
        value.coin = coin

        const web3Instance = window.web3
        const accounts = await web3Instance.eth.getAccounts()
        let contractInstance = contract(contractAbi[coin])
        contractInstance.setProvider(web3Instance.currentProvider)
        try {
            const tokenInstant = await contractInstance.deployed()
            const response = await tokenInstant.burn(
                web3Instance.utils.toWei(value.amount, 'ether'),
                {
                    from: accounts[0]
                }
            )
            value.txnId = response.tx
            value.status = true
            await withdraw(value)
            setVisible(true)
            reset()
        } catch (e) {
            console.log(e)
            reset()
        }
        setLoading(false)
    }
    const dismissHandle = () => setVisible(false)

    return (
        <React.Fragment>
            <Header inverted as="h2">
                Withdraw
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Form inverted onSubmit={handleSubmit(onSubmitHandler)}>
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
                                                    options={optionsWithdraw}
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
                                            value={value}
                                            inputRef={ref}
                                            step="any"
                                            labelPosition="right"
                                            size="huge"
                                            placeholder="Amount"
                                        />
                                    </Form.Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name="walletTo"
                                defaultValue={''}
                                rules={{ required: true }}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            size="huge"
                                            placeholder="Your Receiving Address"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            inputRef={ref}
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
                                        disabled={!isMeta}>
                                        Withdraw
                                    </Button>
                                    <Button secondary size="huge" type="reset">
                                        RESET
                                    </Button>
                                </div>
                            </Form.Field>
                        </Form>
                        {visible && (
                            <Message
                                positive
                                inverted
                                onDismiss={dismissHandle}
                                header="Success!"
                                content={`Your withdrawal will be processed soon.`}
                            />
                        )}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ConnectMetamask />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    )
}

export default Withdraw
