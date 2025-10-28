import { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

function NewBlogButton({displaySetter}) {
    return (
        <Button className='me-2' onClick={() => displaySetter(true)}>New Blog</Button>
    )
}

function NewBlogModal({display, displaySetter}) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
                author: author,
                category: category
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <Modal show={display} onHide={() => displaySetter(false)}>
            <Modal.Header className='justify-content-between'>
                <h4>New Blog</h4>
                <Button variant="danger" onClick={() => displaySetter(false)}>Close</Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => submitForm(e)}>
                    <Form.Group>
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setAuthor(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" onChange={(e) => setContent(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select required onChange={(e) => setCategory(e.target.value)}>
                            <option>Select Category</option>
                            <option value="Tech">Tech</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Health">Health</option>
                            <option value="Cooking">Cooking</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <span className='d-flex justify-content-end'>
                    <Button type='submit'>Submit</Button>
                </span>
            </Modal.Footer>
        </Modal>
    )
}

export { NewBlogButton, NewBlogModal }
