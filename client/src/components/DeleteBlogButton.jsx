import { Button } from 'react-bootstrap';

function deleteBlog(blogId) {
    fetch('/api/blog/'+blogId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const data = response.json();
        if (!response.ok) {
            throw new Error(response.status, response.message);
        }
        return data;
    })
    .then(data => {
        console.log(data);
        window.location.href = '/';
    })
    .catch(err => {
        console.error(err);
    });
}


function DeleteBlogButton({blogId}) {
    return (
        <Button variant='danger' onClick={() => deleteBlog(blogId)}>Delete</Button>
    );
}

export { DeleteBlogButton };
