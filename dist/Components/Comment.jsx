import React from 'react';



let Comment = ({comment}) => {
    return (
        <h3>{`[${comment.time}]${comment.text}`}</h3>
    );
};

export default Comment;