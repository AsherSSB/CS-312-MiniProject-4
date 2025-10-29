import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function patchPost(event, blogId, content) {
    event.preventDefault();
    fetch('/api/blog/'+blogId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    })
    .then(_ => {
        window.location.reload();
    })
    .catch(error => console.log(error));
}

function EditBlogModal({ blogId, display, displaySetter}) {
    const [content, setContent] = useState("");

    return (
        <Form >
            <Modal show={display} onHide={() => displaySetter(false)}>
                <Modal.Header className='justify-content-between'>
                    <h4>New Blog</h4>
                    <Button variant="danger" onClick={() => displaySetter(false)}>Close</Button>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" onChange={(e) => setContent(e.target.value)} required></Form.Control>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-end'>
                    <Button onClick={(e) => patchPost(e, blogId, content)} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export { EditBlogModal };
