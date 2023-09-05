import React from 'react';
import { Typography } from 'antd';
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';
import { socket } from '../socket'; 

const { Paragraph } = Typography;


let Comment = ({comment, pinned, update}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPinned, setIsPinned] = React.useState(pinned);

    React.useEffect(() => {
        setIsPinned(pinned);
    }, [pinned]);
    const handlePin = () => {
        const newPinnedState = !isPinned;
        setIsPinned(newPinnedState);
        update({type:'pin', messageId:comment.id, pinned:newPinnedState});//client-side update
        socket.emit('pin', { messageId: comment.id, pinned: newPinnedState });//send to server
    };

    return (
        <Paragraph style={{ textAlign: 'left' }}
        key={comment.pinned ? 'pinned' : 'unpinned'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                pinned ? (
                    <PushpinFilled onClick={handlePin} style={{ cursor: 'pointer' }} />
                ) : (
                    <PushpinOutlined onClick={handlePin} style={{ cursor: 'pointer' }} />
                )
            )}
            {comment.text}
        </Paragraph>
    );
};

export default Comment;