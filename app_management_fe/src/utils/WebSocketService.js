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

export const connect = (username, onMessageReceived, token) => {
    const socket = new SockJS('http://localhost:7777/ws');
    stompClient = Stomp.over(socket);
    const headers = {
        Authorization: `Bearer ${token}`
    };
    stompClient.connect(headers, () => onConnected(username, onMessageReceived), onError);
};

export const sendMessage = (message, username, recepient, type) => {
    if (stompClient && stompClient.connected) {
        const messagePayload = {
            content:  message,
            sender: username,
            receiver: recepient,
            requestBased: type
        }
        stompClient.send("/app/chat", {}, JSON.stringify(messagePayload));
    }
};
