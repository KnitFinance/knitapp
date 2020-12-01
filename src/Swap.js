import * as React from 'react'
import {
    Container,
    Header,
    Divider,
    Input,
    Dropdown,
    Button,
    Form,
    Checkbox,
    Segment,
    Icon,
    Message
} from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { swap } from './actions'

const options = [
    { key: 'xlm', text: 'Stellar', value: 'XLM' },
    { key: 'xrp', text: 'Ripple', value: 'XRP' },
    { key: 'btc', text: 'Bitcoin', value: 'BTC' }
]

function Swap() {
    const { handleSubmit, control, errors } = useForm()
    const [loading, setLoading] = React.useState()
    const [coin, setCoin] = React.useState('XLM')

    const onSubmitHandler = async values => {
        values.coin = coin
        try {
            const result = await swap(values)
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <React.Fragment>
            <Header inverted as="h2">
                Swap
            </Header>
            <Form
                inverted
                onSubmit={handleSubmit(onSubmitHandler)}
                name={'swap'}>
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
                                        defaultValue="XLM"
                                        onChange={(e, data) =>
                                            setCoin(data.value)
                                        }
                                    />
                                }
                                onChange={onChange}
                                type="number"
                                onBlur={onBlur}
                                selected={value}
                                labelPosition="right"
                                size="huge"
                                placeholder="Send"
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
                                selected={value}
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
                            EXCHANGE
                        </Button>
                        <Button secondary size="huge" type="reset">
                            RESET
                        </Button>
                    </div>
                </Form.Field>
            </Form>

            {loading && (
                <Segment inverted placeholder>
                    <Header icon>
                        <Icon loading name="certificate" />
                        <pre>0x788231f6F148004EaAA2413953Bc362e95C28c8f</pre>

                        <Header inverted as="h3">
                            You will recive approximately 12 kXLM
                        </Header>
                    </Header>
                </Segment>
            )}
        </React.Fragment>
    )
}

export default Swap
