import { Button, Card, Form } from 'react-bootstrap'
import { Header } from './Header'
import { useState } from 'react'

function setLocalStorageUserId(userId, timeToLive) {
    const time = new Date();
    const expirationTime = time.getTime() + timeToLive;

    const data = {
        userId: userId,
        ttl: expirationTime
    }

    localStorage.setItem('userId', JSON.stringify(data));
}

function Login() {
    const [userId, setUserId] = useState(''); 
    const [password, setPassword] = useState(''); 

    const [errorDisplay, setErrorDisplay] = useState('d-none');

    let errorClasses = `text-danger ${errorDisplay}`;

    function submitLogin(event) {
        event.preventDefault();
        const data = { userid: userId, password: password };
        const dataJson = JSON.stringify(data);
        
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJson
        })
        .then(response => {
            if (!response.ok) {
                setErrorDisplay('');
                throw new Error('unauthorized');
            }

            return response.json()
        })
        .then(data => {
            setLocalStorageUserId(data.userId, data.ttl);
            window.location.href = '/';
        })
        .catch(err => {
            console.error('Error while logging in, ', err);
        });
    }

    return (
        <div>
            <Header />

            <Form className='d-flex justify-content-center'>
                <Card className='w-50 my-5'>
                    <Card.Header>Login to Blog.site</Card.Header>

                    <Card.Body>
                        <Form.Group className='my-4'>
                            <Form.Control type='text' placeholder='userId' onChange={(e) => setUserId(e.target.value)} />
                            <Form.Text className={errorClasses}>Invalid User Id or Password</Form.Text>
                        </Form.Group>

                        <Form.Group className='my-4'>
                            <Form.Control type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Card.Body>

                    <Card.Footer className='d-flex justify-content-end'>
                        <Button onClick={(e) => submitLogin(e)}>Submit</Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    );
}

export { Login };
