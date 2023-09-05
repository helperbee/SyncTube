import React from 'react';
import Comment from './Comment.jsx';
import { socket } from '../socket';




let VideoComments = () => {

    const [comments, setComments] = React.useState([]);

    const onComment = (comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };
    const onUpdate = (update) => {
        const updateType = update.type;
    
        setComments((prevComments) => {
            const updatedComments = [...prevComments];
            console.log(update);//test
            console.log(updatedComments);
    
            switch (updateType) {
                case 'pin':
                    updatedComments[update.messageId - 1].pinned = update.pinned;
                    return updatedComments;
                default:
                    console.log('Confusion');
                    return prevComments;
            }
        });
    };
    React.useEffect(() => {
        socket.on('comment', onComment);
        socket.on('update', onUpdate); 
        return () => {
            socket.off('comment', onComment);
            socket.off('update', onUpdate);
        }
    }, []);

    return (
        <>
            <h1>Video Comments</h1>
            {
                comments.length > 0 &&
                comments.map((e) => {
                    return <Comment key={e.id} comment={e}/>;
                })
            }
        </>
    );

};

export default VideoComments;