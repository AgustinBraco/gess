import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import { PORT } from './config/environment';
import MongoDB from './config/mogodb';
import RedisDB from './config/redis';
import homeRouter from './routes/home.route';
import userRouter from './routes/user.route';
import reviewRouter from './routes/review.route';
import chatRouter from './routes/chat.route';
import chatWebsocket from './websocket/chat.websocket';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ---------- Database connection --
MongoDB.getInstance()
RedisDB.getInstance()

// ---------- Middlewares ----------
app.use(express.json());
app.use(cors());

// ---------- Routes ---------------
app.use('/', homeRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/chat', chatRouter);

// ---------- Websocket ------------
chatWebsocket(io);

// ---------- Start server ---------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app