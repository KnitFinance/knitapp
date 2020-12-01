import * as React from 'react'
import {
    Header,
    Input,
    Dropdown,
    Button,
    Form,
    Checkbox
} from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { withdraw } from './actions'

const contract = require('@truffle/contract')
const contractAbi = {
    XLM: require('./abi/KnitStellar.json')
}

const Web3 = require('web3')

const options = [
    { key: 'XLM', text: 'K-XLM', value: 'XLM' }
    // { key: 'kxrp', text: 'K-XRP', value: 'kxrp' },
    // { key: 'kltc', text: 'K-LTC', value: 'kltc' }
]
function Withdraw() {
    const { handleSubmit, control, errors } = useForm()
    const [currentAccount, setCurrentAccount] = React.useState(null)
    const [coin, setCoin] = React.useState('XLM')
    const [loading, setLoading] = React.useState()

    React.useEffect(() => {
        const ethEnabled = () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                window.ethereum.enable()
                return true
            }
            return false
        }
        if (!ethEnabled()) {
            alert(
                'Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!'
            )
        }
    })

    const onSubmitHandler = async value => {
        setLoading(true)
        value.coin = coin

        //dummy
        value.walletFrom = 'WillRemoveLater'

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
            // const response = await tokenInstant.mint(
            //     accounts[0],
            //     web3Instance.utils.toWei('2', 'ether'),
            //     {
            //         from: accounts[0]
            //     }
            // )
            const { tx } = response
            value.txnId = tx
            await withdraw(value)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    return (
        <React.Fragment>
            <Header inverted as="h2">
                Withdraw
            </Header>
            <Form inverted onSubmit={handleSubmit(onSubmitHandler)}>
                <Controller
                    control={control}
                    name="amount"
                    defaultValue={0}
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
                                selected={value}
                                step="any"
                                labelPosition="right"
                                size="huge"
                                placeholder="Send"
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
                                selected={value}
                            />
                        </Form.Field>
                    )}
                />

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
                                label="I agree to the terms and privacy policy"
                            />
                        </Form.Field>
                    )}
                />

                <Form.Field>
                    <div>
                        <Button primary size="huge" loading={loading}>
                            Withdraw
                        </Button>
                        <Button secondary size="huge" type="reset">
                            RESET
                        </Button>
                    </div>
                </Form.Field>
            </Form>
        </React.Fragment>
    )
}

export default Withdraw
