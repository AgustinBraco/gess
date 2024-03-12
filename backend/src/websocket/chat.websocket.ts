import { Server } from 'socket.io';

import chatModelInstance from '../models/chat.model';
import RedisDB from '../config/redis';
import { checkJWT } from '../helpers/user.helper';


const chatWebsocket = (io: Server) => {
  io.on('connection', (socket) => {
    let authenticated = false;
    let user_id = '';

    socket.on('authenticate', async (token) => {
      const { id, role } = checkJWT(token);
      if (id && role) {
        authenticated = true;
        user_id = id;
        await RedisDB.getInstance().set(id, socket.id);
        socket.emit('authenticated');
      }
    })

    socket.on('message', async (msg, recipinet_id) => {
      if (!authenticated) {
        return;
      }
      chatModelInstance.addMessage(user_id, recipinet_id, msg)
      const recipientConnected = await RedisDB.getInstance().get(recipinet_id);
      if (recipientConnected) {
        io.to(recipientConnected).emit('message', msg, user_id);
      }
    });

    socket.on('disconnect', async () => {
      RedisDB.getInstance().set(user_id, null);
    })

  });
}

export default chatWebsocket