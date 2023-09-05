import React from 'react';
import Comment from './Comment.jsx';
import { socket } from '../socket';




let VideoComments = () => {

    const [comments, setComments] = React.useState([]);

    const onComment = (comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };
    React.useEffect(() => {
        socket.on('comment', onComment); //this is bad
        return () => {
            socket.off('comment', onComment);
        }
    }, []);

    return (
        <>
            <h1>Video Comments</h1>
            {
                comments.length > 0 &&
                comments.map((e) => {
                    return <Comment comment={e}/>;
                })
            }
        </>
    );

};

export default VideoComments;