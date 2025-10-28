import { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Header } from './Header'
import { validateUserId, validateUsername, validatePassword } from '../utils/signup-utils'

async function postSignup(payload) {
    const jsonData = JSON.stringify(payload);
    return fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status, response.statusText);
        }
    })
    .then(_ => {
        window.location.href = '/login';
    })
    .catch(err => {
        console.debug(err);
    });
}
function Signup() {
    // signup variables
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // display variables for signup errors
    const [useridErrorDisplay, setUseridErrorDisplay] = useState('d-none');
    const [usernameErrorDisplay, setUsernameErrorDisplay] = useState('d-none');
    const [passwordErrorDisplay, setPasswordErrorDisplay] = useState('d-none');
    const [passwordConfirmErrorDisplay, setPasswordConfirmErrorDisplay] = useState('d-none');
    // full error display classes
    let useridErrorClasses = `text-danger ${useridErrorDisplay}`;
    let usernameErrorClasses = `text-danger ${usernameErrorDisplay}`;
    let passwordErrorClasses = `text-danger ${passwordErrorDisplay}`;
    let passwordConfirmErrorClasses = `text-danger ${passwordConfirmErrorDisplay}`;

    const validateSignupInfo = () => {
        const passwordsDontMatch = password !== passwordConfirm;
        const invalidPassword = !validatePassword(password);
        const invalidUserId = !validateUserId(userId);
        const invalidUsername = !validateUsername(username);

        if (passwordsDontMatch) {
            setPasswordErrorDisplay('');
        }
        
        if (invalidPassword) {
            setPasswordConfirmErrorDisplay('');
        }

        if (invalidUserId) {
            setUseridErrorDisplay('');
        }

        if (invalidUsername) {
            setUsernameErrorDisplay('');
        }

        return !(passwordsDontMatch ||
            invalidPassword ||
            invalidUsername ||
            invalidUserId);
    }

    const submitSignup = (event) => {
        event.preventDefault();
        console.debug('submitting');
        if (validateSignupInfo()) {
            const payload = {
                username: username,
                userid: userId,
                password: password
            }
            console.debug('posting');
            postSignup(payload);
        }
    }

    return (
        <>
            <Header />
            <Form>
                <div className="d-flex justify-content-center">
                    <Card className="w-50 my-5">
                        <Card.Header>Sign up for Blog.site</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Control type='text' placeholder='userid' onChange={(e) => setUserId(e.target.value)}>
                                </Form.Control>
                                <Form.Text className={useridErrorClasses}>
                                    Userid must contain an alphanumeric character
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}>
                                </Form.Control>
                                <Form.Text className={usernameErrorClasses}>
                                    Userid must contain an alphanumeric character
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                                <Form.Text className={passwordErrorClasses}>
                                    Userid must contain an alphanumeric character
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='password' placeholder='retype password' onChange={(e) => setPasswordConfirm(e.target.value)}>
                                </Form.Control>
                                <Form.Text className={passwordConfirmErrorClasses}>
                                    Userid must contain an alphanumeric character
                                </Form.Text>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Button type='submit' onClick={submitSignup}>Submit</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Form>
        </>
    )
}

export { Signup }
