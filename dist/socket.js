import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : process.env.AWS_SERVER;
export const socket = io(URL);