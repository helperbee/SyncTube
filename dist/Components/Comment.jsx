import React from 'react';
import { Typography } from 'antd';
import Icon, { PushpinOutlined, PushpinFilled } from '@ant-design/icons';
import { socket } from '../socket'; 

const { Paragraph } = Typography;


const Controller = () => (
<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 9C5 6.19108 5 4.78661 5.67412 3.77772C5.96596 3.34096 6.34096 2.96596 6.77772 2.67412C7.78661 2 9.19108 2 12 2C14.8089 2 16.2134 2 17.2223 2.67412C17.659 2.96596 18.034 3.34096 18.3259 3.77772C19 4.78661 19 6.19108 19 9V15C19 17.8089 19 19.2134 18.3259 20.2223C18.034 20.659 17.659 21.034 17.2223 21.3259C16.2134 22 14.8089 22 12 22C9.19108 22 7.78661 22 6.77772 21.3259C6.34096 21.034 5.96596 20.659 5.67412 20.2223C5 19.2134 5 17.8089 5 15V9Z" stroke="#1C274C" strokeWidth="1.5" />
    <path d="M15 15.5C15 17.1569 13.6569 18.5 12 18.5C10.3431 18.5 9 17.1569 9 15.5C9 13.8431 10.3431 12.5 12 12.5C13.6569 12.5 15 13.8431 15 15.5Z" stroke="#1C274C" strokeWidth="1.5" />
    <path d="M9 5.5H15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="9" r="1" fill="#1C274C" />
    <circle cx="12" cy="9" r="1" fill="#1C274C" />
    <circle cx="15" cy="9" r="1" fill="#1C274C" />
</svg>
);
const FilledController = () => (
    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.75 15.5C9.75 14.2574 10.7574 13.25 12 13.25C13.2426 13.25 14.25 14.2574 14.25 15.5C14.25 16.7426 13.2426 17.75 12 17.75C10.7574 17.75 9.75 16.7426 9.75 15.5Z" fill="#1C274C" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.67412 3.77772C5 4.78661 5 6.19108 5 9V15C5 17.8089 5 19.2134 5.67412 20.2223C5.96596 20.659 6.34096 21.034 6.77772 21.3259C7.78661 22 9.19108 22 12 22C14.8089 22 16.2134 22 17.2223 21.3259C17.659 21.034 18.034 20.659 18.3259 20.2223C19 19.2134 19 17.8089 19 15V9C19 6.19108 19 4.78661 18.3259 3.77772C18.034 3.34096 17.659 2.96596 17.2223 2.67412C16.2134 2 14.8089 2 12 2C9.19108 2 7.78661 2 6.77772 2.67412C6.34096 2.96596 5.96596 3.34096 5.67412 3.77772ZM12 11.75C9.92893 11.75 8.25 13.4289 8.25 15.5C8.25 17.5711 9.92893 19.25 12 19.25C14.0711 19.25 15.75 17.5711 15.75 15.5C15.75 13.4289 14.0711 11.75 12 11.75ZM8.25 5.5C8.25 5.08579 8.58579 4.75 9 4.75H15C15.4142 4.75 15.75 5.08579 15.75 5.5C15.75 5.91421 15.4142 6.25 15 6.25H9C8.58579 6.25 8.25 5.91421 8.25 5.5ZM9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9ZM15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z" fill="#1C274C" />
    </svg>
    );

const ControllerIcon = (props) => <Icon component={Controller} {...props} />
const FilledControllerIcon = (props) => <Icon component={FilledController} {...props} />

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

    let getTimeString = (commentDate) => {
        const currentDate = new Date(commentDate);
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';      
        const formattedHours = hours % 12 || 12;      
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;      
        const timeString = `[${formattedHours}:${formattedMinutes}:${formattedSeconds}${ampm}]`;      
        return timeString;
      }

    return (
        <Paragraph style={{ textAlign: 'left' }}
        key={comment.pinned ? 'pinned' : 'unpinned'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ControllerIcon/>
            <FilledControllerIcon/>
            {isHovered && (
                pinned ? (
                    <PushpinFilled onClick={handlePin} style={{ cursor: 'pointer' }} />
                ) : (
                    <PushpinOutlined onClick={handlePin} style={{ cursor: 'pointer' }} />
                )
            )}
            {getTimeString(comment.at)}
            {comment.text}
        </Paragraph>
    );
};

export default Comment;