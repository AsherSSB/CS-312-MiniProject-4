import { useState, useEffect } from 'react';
import { NewBlogButton, NewBlogModal } from "./NewBlogButton"; 
import { Header } from "./Header";
import { DeleteBlogButton } from './DeleteBlogButton';
import { EditBlogModal } from './EditBlogButton';
import { Container, Row, Card, Button } from 'react-bootstrap'

async function getBlogs() {
    const data = await fetch('/blogs')
    .then((response) => {
        if (!response.ok) {
            throw Error(response);
        }
        return response.json();
    })
    .then((blogs) => {
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
    const userId = JSON.parse(localStorage.getItem('userId')).userId;

    const [newBlogModalDisplay, setNewBlogModalDisplay] = useState(false);
    const [editBlogModalDisplay, setEditBlogModalDisplay] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(-1);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

    const openEditBlogModal = ({ blogId }) => {
        console.log('clicked!', blogId);
        setEditingBlog(blogId);
        setEditBlogModalDisplay(true);
    }

    const EditBlogButton = ({ blogId }) => {
        console.debug('init blog edit but id', blogId);
        return (
            <Button variant='secondary' onClick={() => openEditBlogModal({blogId})}>Edit</Button>
        );
    }

    return (
        <>
            <Header additionalButtons={[<NewBlogButton displaySetter={setNewBlogModalDisplay}/>]} />
            <NewBlogModal display={newBlogModalDisplay} displaySetter={setNewBlogModalDisplay}/>
            <EditBlogModal blogId={editingBlog} display={editBlogModalDisplay} displaySetter={setEditBlogModalDisplay}/>

            <Container>
                {blogs.map((blog, _) => (

                    <Row className='my-3'>
                        <Card className='px-0'>
                            <Card.Header className='d-flex justify-content-between'>
                                <span>
                                    <span className="rounded-pill bg-primary px-2 py-1 me-3">{blog.category}</span>
                                    {blog.title}
                                </span>
                                <span className="blog-author">Posted By: {blog.username}</span>
                            </Card.Header>
                            <Card.Body className='my-3'>
                                <Card.Text>{blog.body}</Card.Text>
                            </Card.Body>
                            <Card.Footer className='d-flex align-items-center justify-content-between'>
                                <span className="blog-time-container">Posted at: <span className="blog-time">{blog.date_created}</span></span>
                             
                            {blog.creator_user_id === userId ? (
                                <span>
                                    <span className='mx-2'><DeleteBlogButton blogId={blog.blog_id} /></span>
                                    <EditBlogButton blogId={blog.blog_id} />
                                </span>
                            ): null}
                            </Card.Footer>
                        </Card>
                    </Row>

                ))}
            </Container>

        </>
    );
}

export { HomePage };
