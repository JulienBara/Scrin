import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('devices')
export class Device {
  @ObjectIdColumn() id: ObjectId;
  @Column() name: string;
  @Column() address: string;

  constructor(device?: Partial<Device>) {
    Object.assign(this, device);
  }
}
