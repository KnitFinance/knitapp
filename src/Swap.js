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

const options = [
    { key: 'btc', text: 'Bitcoin', value: 'btc' },
    { key: 'xlm', text: 'Stellar', value: 'xlm' },
    { key: 'xrp', text: 'Ripple', value: 'xrp' }
]
function Swap() {
    return (
        <React.Fragment>
            <Header inverted as="h2">
                Swap
            </Header>
            <Form inverted>
                <Form.Field>
                    <Input
                        label={
                            <Dropdown
                                defaultValue="btc"
                                size="huge"
                                options={options}
                            />
                        }
                        labelPosition="right"
                        size="huge"
                        placeholder="Send"
                    />
                </Form.Field>
                <Form.Field>
                    <Input size="huge" placeholder="Your Sending Address" />
                </Form.Field>

                <Form.Field>
                    <Input size="huge" placeholder="Your ETH Address" />
                </Form.Field>

                <Form.Field>
                    <Checkbox label="I agree to the terms and privacy policy" />
                </Form.Field>

                <Form.Field>
                    <div>
                        <Button primary size="huge">
                            EXCHANGE
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

export default Swap
