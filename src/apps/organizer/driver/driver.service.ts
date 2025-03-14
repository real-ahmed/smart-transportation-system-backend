import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverService {
  async create() {}
  async findAll(request: Request) {}
  async findOne(request: Request, id: string) {}
  async update() {}
  async remove(request: Request, id: string) {}
}
