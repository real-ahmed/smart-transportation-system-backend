import { Injectable, NotFoundException } from '@nestjs/common';
import { DriverDto } from './dtos/driver.dto';
import { DriversService } from 'src/users/services/drivers.service';
import { uploadFile } from 'src/common/helpers/file-upload.helper';

@Injectable()
export class DriverService {
  constructor(private readonly driversService: DriversService) {}

  async create(
    request: Request,
    createDriverDto: Record<string, any>,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const imageUrl = await uploadFile(file, 'drivers');
      createDriverDto.image = imageUrl;
    }
    return this.driversService.create(createDriverDto);
  }

  async findAll(request: Request, page: number = 1, limit: number = 10) {
    return this.driversService.findAll(page, limit,{});
  }

  async findOne(request: Request, id: string) {
    const driver = await this.driversService.findOne(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async update(
    request: Request,
    id: string,
    updateDriverDto: Record<string, any>,
    file?: Express.Multer.File,
  ) {
    const existingDriver = await this.findOne(request, id);
    if (file) {
      const imageUrl = await uploadFile(file, 'drivers');
      updateDriverDto.image = imageUrl;
    }
    return this.driversService.update(id, {
      ...existingDriver,
      ...updateDriverDto,
    });
  }

  async remove(request: Request, id: string) {
    const driver = await this.findOne(request, id);
    return this.driversService.remove(id);
  }
}
