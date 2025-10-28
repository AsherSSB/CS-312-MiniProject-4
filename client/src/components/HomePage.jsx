import { useState, useEffect } from 'react';
import { NewBlogButton, NewBlogModal } from "./NewBlogButton"; 
import { Header } from "./Header";
import { DeleteBlogButton } from './DeleteBlogButton';
import { EditBlogButton, EditBlogModal } from './EditBlogButton';
import { Container, Row, Card} from 'react-bootstrap'

async function getBlogs() {
    const data = await fetch('/blogs')
    .then((response) => {
        if (!response.ok) {
            throw Error(response);
        }
        return response.json();
    })
    .then((blogs) => {
        console.debug('buh');
        console.debug(blogs);
        return blogs
    })
    .catch((error) => {
        console.error(error);
        return [];
    });

    data.forEach(blog => {
        blog.date_created = new Date(blog.date_created);
        blog.date_created = blog.date_created.toLocaleString();
    });

    return data;
}

function HomePage() {
    const [modalDisplay, setModalDisplay] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

    return (
        <>
            <Header additionalButtons={[<NewBlogButton displaySetter={setModalDisplay}/>]} />
            <NewBlogModal display={modalDisplay} displaySetter={setModalDisplay}/>

            <Container>
                {blogs.map((blog, _) => (

                    <Row className='my-3'>
                        <Card className='px-0'>
                            <Card.Header className='d-flex justify-content-between'>
                                <span>
                                    <span class="rounded-pill bg-primary px-2 py-1 me-3">{blog.category}</span>
                                    {blog.title}
                                </span>
                                <span class="blog-author">Posted By: {blog.username}</span>
                            </Card.Header>
                            <Card.Body className='my-3'>
                                <Card.Text>{blog.body}</Card.Text>
                            </Card.Body>
                            <Card.Footer className='d-flex justify-content-between'>
                                <span class="blog-time-container">Posted at: <span class="blog-time">{blog.date_created}</span></span>
                                <span class="blog-controls">
                                </span>
                            </Card.Footer>
                        </Card>
                    </Row>

                ))}
            </Container>

        </>
    );
}

export { HomePage };
