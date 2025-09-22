import React, { useEffect, useState } from "react";
import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';

const ChatEngine = props => {
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (props.visible) {
            setTimeout(() => {
                setShowChat(true);
            }, 500);
        }
    }, [props.visible]);

    return (
        <div
            className='transition-5'
            style={{ 
                    height: props.visible ? '100%' : '0px',
                    zIndex: props.visible ? '100' : '0',
                    width: '100%',  
                    backgroundColor: '#fff'
            
            }}
        >
            {
               showChat &&
                <ChatEngineWrapper>
                    <Socket 
                        projectID="dfdb9dde-05f8-49fc-a3fc-c62ea01e8a4d"
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat.id} />
                </ChatEngineWrapper>
            }
        </div>
    );
}

export default ChatEngine;