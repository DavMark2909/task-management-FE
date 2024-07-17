// WebSocketService.js
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

function onConnected(username, method){
    stompClient.subscribe(`/user/${username}/queue/messages`, method);
    console.log("after subscribing epta")
}

function onError() {
    console.log("pizda ebannaya with messaging");
}

export const connect = (username, onMessageReceived) => {
    const socket = new SockJS('http://localhost:7777/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => onConnected(username, onMessageReceived), onError);
};

export const sendMessage = (payload) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat",
            body: JSON.stringify(payload),
        });
    }
};
