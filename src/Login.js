import * as React from 'react'
import { Header, Divider, Input, Button, Form } from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import { login } from './actions'

function Login({ history }) {
    const { handleSubmit, control } = useForm()
    const [loading, setLoading] = React.useState()
    const onSubmitHandler = async values => {
        setLoading(true)
        try {
            const { data } = await login(values)
            localStorage.setItem('user', data.data.token)
            window.location.reload(false)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    return (
        <React.Fragment>
            <Header inverted as="h2">
                Sign In
            </Header>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <Controller
                    control={control}
                    name="email"
                    defaultValue={''}
                    rules={{ required: true }}
                    render={({ onChange, onBlur, value, ref }) => (
                        <Form.Field>
                            <Input
                                size="huge"
                                placeholder="Email address"
                                onChange={onChange}
                                value={value}
                            />
                        </Form.Field>
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    defaultValue={''}
                    rules={{ required: true }}
                    render={({ onChange, onBlur, value, ref }) => (
                        <Form.Field>
                            <Input
                                size="huge"
                                type="password"
                                placeholder="Password"
                                onChange={onChange}
                                value={value}
                            />
                        </Form.Field>
                    )}
                />

                <Form.Field>
                    <Button primary size="huge" loading={loading}>
                        Sign In
                    </Button>
                </Form.Field>
            </Form>
        </React.Fragment>
    )
}

export default Login
