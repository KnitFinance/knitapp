import * as React from 'react'
import { Header, Divider, Input, Button, Form } from 'semantic-ui-react'

import AdminNav from './AdminNav'

function Login() {
    return (
        <React.Fragment>
            <Header inverted as="h2">
                Sign In
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
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <AdminNav />
        </React.Fragment>
    )
}

export default Login
