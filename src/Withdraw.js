import * as React from 'react'
import {
    Header,
    Input,
    Dropdown,
    Button,
    Form,
    Checkbox,
    Message,
    Divider,
    Grid,
    Popup,
    Icon,
    Statistic,
    Label
} from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { withdraw, withdrawMinimum } from './actions'
import { optionsWithdraw, allChain, getTokenBalance } from './utils'
import { contracts } from './config'
import { CounterContext } from './context'

const contract = require('@truffle/contract')
const abi = require('./abi/abi.json')

const Web3 = require('web3')

function Withdraw() {
    const { handleSubmit, watch, control, errors, reset, getValues } = useForm()
    const [coin, setCoin] = React.useState('ETH')
    const [loading, setLoading] = React.useState()
    const [visible, setVisible] = React.useState(false)
    const [chains, setChains] = React.useState([])
    const [tokenBalance, setTokenBalance] = React.useState(0)
    const [isMinimum, setIsMinimum] = React.useState(false)
    const [minimum, setMinimum] = React.useState(0)

    // const [network, setNetwork] = React.useState(
    //     reactLocalStorage.get('network', 'BSC')
    // )

    const [
        connectWallet,
        setConnectWallet,
        network,
        setNetwork,
        networkName,
        setNetworkName,
        chainName,
        setChainName
    ] = React.useContext(CounterContext)

    //console.log(setConnectWallet, setNetwork, setNetworkName, setChainName)

    React.useEffect(() => {
        const allChainList = allChain()
        setChains(allChainList)
        const initData = async () => {
            try {
                const balance = await getTokenBalance(
                    coin,
                    connectWallet,
                    network
                )
                setTokenBalance(balance)
                const minimumData = await withdrawMinimum(coin)

                if (balance >= minimumData.data.data.min_amount) {
                    setIsMinimum(true)
                } else {
                    setIsMinimum(false)
                }
                setMinimum(minimumData.data.data.min_amount)
            } catch (e) {
                console.log(e)
            }
        }

        initData()
    }, [coin, connectWallet, network])

    const onChangeHandler = async coin => {
        try {
            const result = await withdrawMinimum(coin)
            if (tokenBalance >= result.data.data.min_amount) {
                setIsMinimum(true)
            } else {
                setIsMinimum(false)
            }
            setMinimum(result.data.data.min_amount)
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmitHandler = async value => {
        setLoading(true)
        value.coin = coin

        const web3Instance = new Web3(window.web3.currentProvider)
        const accounts = await web3Instance.eth.getAccounts()
        let contractInstance = contract({
            abi: abi
        })
        contractInstance.setProvider(web3Instance.currentProvider)
        try {
            const tokenInstant = await contractInstance.at(
                contracts[coin][network]
            )
            const response = await tokenInstant.burn(
                web3Instance.utils.toWei(value.amount, 'ether'),
                {
                    from: accounts[0]
                }
            )
            value.txnId = response.tx
            value.status = true
            value.network = network
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
    const watchAmount = watch('amount', 0)
    const watchMinimum = watchAmount && watchAmount < minimum

    return (
        <React.Fragment>
            <Header inverted as="h2">
                Withdraw
            </Header>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />

            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Form
                            inverted
                            onSubmit={handleSubmit(onSubmitHandler)}
                            className=" swapdetails">
                            <div className="header-wrapper">
                                <ul className="network-tab uppercase">
                                    {chains.map((value, index) => (
                                        <li
                                            className={
                                                chainName === value
                                                    ? 'active'
                                                    : ''
                                            }
                                            key={index}>
                                            {value}
                                        </li>
                                    ))}
                                    <li>
                                        <Popup
                                            wide
                                            content="You can change network using Metamask"
                                            trigger={
                                                <Icon name="question circle outline" />
                                            }
                                        />
                                    </li>
                                </ul>
                                <p
                                    className={
                                        networkName.networkStatus
                                            ? 'netinfo'
                                            : 'netinfo error'
                                    }>
                                    {!networkName.networkStatus && (
                                        <Icon name="warning circle" />
                                    )}
                                    {networkName.networkName}
                                </p>
                            </div>

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
                                                    size="large"
                                                    search
                                                    defaultValue={coin}
                                                    onChange={(e, data) => {
                                                        setCoin(data.value)
                                                        onChangeHandler(
                                                            data.value
                                                        )
                                                    }}
                                                />
                                            }
                                            onChange={onChange}
                                            type="number"
                                            onBlur={onBlur}
                                            value={value}
                                            inputRef={ref}
                                            step="any"
                                            labelPosition="right"
                                            size="large"
                                            placeholder="Amount"
                                        />
                                    </Form.Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name="walletTo"
                                defaultValue={''}
                                rules={{ required: true, minLength: 10 }}
                                render={({ onChange, onBlur, value, ref }) => (
                                    <Form.Field>
                                        <Input
                                            size="large"
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

                            {watchMinimum && (
                                <Message
                                    color="red"
                                    inverted
                                    header={``}
                                    list={[
                                        `Minimum amount to withdraw will be ${minimum}`
                                    ]}
                                />
                            )}

                            <Form.Field>
                                <div>
                                    <Button
                                        primary
                                        basic
                                        size="large"
                                        loading={loading}
                                        disabled={
                                            !networkName.networkStatus ||
                                            !isMinimum ||
                                            watchMinimum
                                        }>
                                        Withdraw
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
                        {networkName.networkStatus && (
                            <div className="centermiddle whatyouget">
                                <p>You are connected to MetaMask</p>
                                <Statistic inverted color="violet">
                                    <Statistic.Value>
                                        {tokenBalance}
                                    </Statistic.Value>
                                    <Statistic.Label>
                                        <span
                                            aria-label="Knit XLM"
                                            data-balloon-pos="up">
                                            K-{coin}
                                        </span>
                                    </Statistic.Label>
                                </Statistic>
                                <Label color="violet">{connectWallet}</Label>
                            </div>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    )
}

export default Withdraw
