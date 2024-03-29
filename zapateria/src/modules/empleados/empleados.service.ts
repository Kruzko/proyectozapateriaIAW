import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {

  constructor(
    @InjectRepository(Empleado)
    private readonly empleadorepository: Repository<Empleado>
  ){

  }

  async create(createEmpleadoDto: CreateEmpleadoDto){
    try{
      const empleado = this.empleadorepository.create(createEmpleadoDto);
      console.log(empleado);
      await this.empleadorepository.save(empleado);
      return empleado;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda')
    }
  }

  findAll() {
    return this.empleadorepository.find({});
  }

  findOne(nif: string) {
    return this.empleadorepository.findOne({
      where: {nif}
    });
  }

  update(nif: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadorepository.update(
      nif,
      updateEmpleadoDto
    )
  }

  async deleteOne(nif: string) {
    return await this.empleadorepository.delete({
      nif
    });
    // return `This action removes a #${cod} zapato`;
  }
  async deleteAllempleados(){
    const query = this.empleadorepository.createQueryBuilder('empleado');
    try{
      return await query
      .delete()
      .where({})
      .execute()
    }catch(error){
      this.handleDBEerrors(error)
    }
  }
  private handleDBEerrors (error: any): never{
    throw new BadRequestException(error.detail)
  }
  
}
