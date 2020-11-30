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
function Login() {
    return (
        <React.Fragment>
            <Header inverted as="h2">
                Admin
            </Header>
            <Form>
                <Form.Field>
                    <Input size="huge" placeholder="Email address" />
                </Form.Field>
                <Form.Field>
                    <Input size="huge" placeholder="Password" />
                </Form.Field>

                <Form.Field>
                    <Button primary size="huge">
                        Sign In
                    </Button>
                </Form.Field>
            </Form>
        </React.Fragment>
    )
}

export default Login
