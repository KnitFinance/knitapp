import * as React from 'react'
import {
    Container,
    Header,
    Divider,
    Input,
    Dropdown,
    Button,
    Form,
    Checkbox
} from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
const contract = require('@truffle/contract')
const KnitStellar = require('./abi/KnitStellar.json')

const Web3 = require('web3')

const options = [
    { key: 'kxlm', text: 'K-XLM', value: 'kxlm' },
    { key: 'kxrp', text: 'K-XRP', value: 'kxrp' },
    { key: 'kltc', text: 'K-LTC', value: 'kltc' }
]
function Withdraw() {
    const { handleSubmit, control, errors } = useForm()
    const [currentAccount, setCurrentAccount] = React.useState(null)

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
        const web3Instance = window.web3
        const accounts = await web3Instance.eth.getAccounts()
        var contractInstance = contract(KnitStellar)
        contractInstance.setProvider(web3Instance.currentProvider)
        try {
            const tokenInstant = await contractInstance.deployed()
            const response = await tokenInstant.burn(
                web3Instance.utils.toWei('1', 'ether'),
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
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <Header inverted as="h2">
                Withdraw
            </Header>
            <Form inverted onSubmit={handleSubmit(onSubmitHandler)}>
                <Form.Field>
                    <Input
                        label={
                            <Dropdown
                                defaultValue="kxlm"
                                size="huge"
                                options={options}
                            />
                        }
                        labelPosition="right"
                        size="huge"
                        placeholder="Amount to withdraw"
                    />
                </Form.Field>
                <Form.Field>
                    <Input size="huge" placeholder="Enter Wallet Address" />
                </Form.Field>

                <Form.Field>
                    <Checkbox label="I agree to the terms and privacy policy" />
                </Form.Field>

                <Form.Field>
                    <div>
                        <Button primary size="huge">
                            Withdraw
                        </Button>
                        <Button secondary size="huge">
                            RESET
                        </Button>
                    </div>
                </Form.Field>
            </Form>
        </React.Fragment>
    )
}

export default Withdraw
