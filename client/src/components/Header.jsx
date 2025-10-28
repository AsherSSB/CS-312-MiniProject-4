import { Button } from 'react-bootstrap'

function Header({additionalButtons=[]}) {
    return (
        <>
            <header className="fixed-top" style={{ 'border-bottom': "2px solid black" , 'background-color': 'white' }}>
                <h1 className="d-flex justify-content-between align-items-center my-3 mx-5">
                    <a href="/" className="text-reset text-decoration-none"><span className="ml-5">Blog.site</span></a>
                    <span>
                        {additionalButtons.map((item, _) => (
                            item
                        ))}
                        <a href="/login"><Button className="me-2" variant="primary">Login</Button></a>
                        <a href="/signup"><Button variant="primary">Sign up</Button></a>
                    </span>
                </h1>
            </header>
            <div style={{'margin-top': '100px'}}></div>  {/* hack to move all elements below header */}
        </>
    ); 
}

export { Header };
