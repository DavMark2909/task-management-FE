// WebSocketService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connect = (username, onMessageReceived) => {
    const socket = new SockJS('/ws');
    stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe(`/user/${username}/queue/messages`, onMessageReceived);
        },
        onStompError: (error) => {
            console.error('WebSocket error: ', error);
        },
    });
    stompClient.activate();
};

export const sendMessage = (payload) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat",
            body: JSON.stringify(payload),
        });
    }
};
