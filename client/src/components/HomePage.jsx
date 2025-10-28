import { NewBlogButton, NewBlogModal } from "./NewBlogButton"; 
import { Header } from "./Header";
import { useState } from 'react';
function HomePage() {
    const [modalDisplay, setModalDisplay] = useState(false);
    
    return (
        <>
            <Header additionalButtons={[<NewBlogButton displaySetter={setModalDisplay}/>]} />
            <NewBlogModal display={modalDisplay} displaySetter={setModalDisplay}/>
        </>
    );
}

export { HomePage };
