import React from 'react';
import { Typography } from 'antd';
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';

const { Paragraph } = Typography;


let Comment = ({comment}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPinned, setIsPinned] = React.useState(false);
    return (
        <Paragraph style={{ textAlign: 'left' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {(isHovered) ? (isPinned ? <PushpinFilled onClick={() => setIsPinned(false)} style={{cursor:'pointer'}}/> : <PushpinOutlined onClick={() => setIsPinned(true)} style={{cursor:'pointer'}}/>) : ''}{/*rotate-135?*/}
        {comment.text}
      </Paragraph>
    );
};

export default Comment;