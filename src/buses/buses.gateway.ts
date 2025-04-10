import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BusesService } from './buses.service';

@WebSocketGateway({ cors: true })
export class BusesGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly busesService: BusesService) { }

    @SubscribeMessage('updateLocation')
    async handleUpdateLocation(@MessageBody() data: { id: string; location: { latitude: number; longitude: number } }, @ConnectedSocket() client: Socket) {
        const { id, location } = data;
        const locationWithTimestamp = { ...location, timestamp: new Date() };
        await this.busesService.updateLocation(id, locationWithTimestamp);
        this.server.emit('locationUpdated', { id, location: locationWithTimestamp });
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
} 