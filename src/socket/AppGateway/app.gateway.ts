import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from 'src/service/jwt/jwt.service'
import { env } from '@config/envitoment.prod';
import { User } from '@routes/user/user.schema';
@WebSocketGateway(env.PORT_SOCKER, {
  cors: {
    origin: [env.IP_FRONTEND1],
    allowedHeaders: ["x-token", "x-meta"],
    credentials: true,
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  private users: User[] = []
  constructor(private _jwt: JwtService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('msgToClient', payload);
  }
  afterInit(server: Server) {
    this.logger.log('socket conectado en el puerto ');
  }
  handleDisconnect(client: Socket) {
    const aa = this.deleteUser(client.id)
    this.logger.log(`Client disconnected: ${aa.username}`);
    this.server.emit('allUser', this.getUsers())
  }
  async handleConnection(client: Socket, ...args: any[]) {
    const resp = await this._jwt.verify(client.handshake.headers["x-token"], true)
    if (resp.ok) {
      const { password, ...ss } = resp.data['_doc']
      this.users.push({ ...ss, id: client.id })
      const user = this.getUser(resp.data._id)
      client.emit('info', user);
      this.server.emit('allUser', this.getUsers())
      this.logger.log(`Client connected: ${user.username}`);
    } else {
      client.emit('error', {})
      this.logger.error('debes desconectar este usuario')
    }
  }
  getUser(id) {
    return (this.users.filter(resp => resp._id === id))[0]

  }
  getUsers() {
    return this.users
  }
  deleteUser(id) {
    console.log(this.getUsers())
    if (this.users.length) {
      const uID = (this.users.filter(resp => resp.id === id))[0]
      this.users = this.users.filter(resp => resp._id !== uID._id)
      return uID
    }
    return null

  }

}