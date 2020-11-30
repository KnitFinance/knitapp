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
    { key: 'kxlm', text: 'K-XLM', value: 'kxlm' },
    { key: 'kxrp', text: 'K-XRP', value: 'kxrp' },
    { key: 'kltc', text: 'K-LTC', value: 'kltc' }
]
function Withdraw() {
    return (
        <React.Fragment>
            <Header inverted as="h2">
                Withdraw
            </Header>
            <Form inverted>
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
