import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidoService {

  constructor(
    @InjectRepository(Pedido)
    private readonly Pedidorepository: Repository<Pedido>
  ){

  }

  async create(CreatePedidoDto: CreatePedidoDto){
    try{
      const pedido = this.Pedidorepository.create(CreatePedidoDto);
      console.log(pedido);
      await this.Pedidorepository.save(pedido);
      return pedido;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda')
    }
  }
  
  findAll() {
    return this.Pedidorepository.find({});
  }

  findOne(cod: string) {
    return this.Pedidorepository.findOne({
      where: {cod}
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }

  async deleteAllpedidos(){
    const query = this.Pedidorepository.createQueryBuilder('pedido');
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
