import socket from "socket.io-client";

export const ioRoom = socket("http://localhost:3001/room", { transports: ['websocket'] });