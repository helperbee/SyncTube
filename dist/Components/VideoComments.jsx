import React from 'react';
import Comment from './Comment.jsx';
import { player } from '../YouTubePlayer';
import { socket } from '../socket';
import { Input, Button } from 'antd';



let VideoComments = () => {

    const [comments, setComments] = React.useState([]);
    const [videoComment, setVideoComment] = React.useState('');

    const handleCommentChange = (event) => {
        const newComment = event.target.value;
        setVideoComment(newComment);
      };
    
      const handleAddComment = () => {
        let sendComment = {
          text: videoComment,
          time: (player) ? player.getCurrentTime() : 0//I could do this on the server-side
        }
        socket.emit('comment', sendComment);//send to server
        setVideoComment('');
      };

    const onComment = (comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };
    const onUpdate = (update) => {    
        setComments((prevComments) => {
            return prevComments.map((comment) => {
                if (comment.id === update.messageId) {
                    return {
                        ...comment,
                        pinned: update.pinned,
                    };
                }
                return comment;
            });
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
            <Input.TextArea
            placeholder="Add a comment"
            showCount 
            maxLength={100}
            value={videoComment}
            onChange={handleCommentChange}
          />
          <Button type="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
            <h1>Video Comments</h1>
            {
                comments.length > 0 &&
                comments.map((e) => {
                    return <Comment key={e.id} comment={e} pinned={e.pinned} update={onUpdate}/>;
                })
            }
        </>
    );

};

export default VideoComments;