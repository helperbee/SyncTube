import React from 'react';
import { Typography } from 'antd';
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';
import { socket } from '../socket'; 

const { Paragraph } = Typography;


let Comment = ({comment}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPinned, setIsPinned] = React.useState(false);

    React.useEffect(() => {
        setIsPinned(comment.pinned);
    }, [comment]);
    let handlePin = (pinned) => {
        setIsPinned(pinned);
        socket.emit('pin', {messageId:comment.id, pinned:pinned});
    };
    return (
        <Paragraph style={{ textAlign: 'left' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {(isHovered) ? (comment.pinned || isPinned ? 
        <PushpinFilled onClick={() => handlePin(false)} style={{cursor:'pointer'}}/> : <PushpinOutlined onClick={() => handlePin(true)} style={{cursor:'pointer'}}/>) : ''}{/*rotate-135?*/}
        {comment.text}
      </Paragraph>
    );
};

export default Comment;