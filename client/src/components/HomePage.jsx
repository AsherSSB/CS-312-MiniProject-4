import { useState } from 'react';
import { NewBlogButton, NewBlogModal } from "./NewBlogButton"; 
import { Header } from "./Header";
import { DeleteBlogButton } from './DeleteBlogButton';
import { EditBlogButton, EditBlogModal } from './EditBlogButton';

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
