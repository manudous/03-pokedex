import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    const pokemon = await this.pokemonModel.create(createPokemonDto);

    return pokemon;
  }

  async findAll() {
    return await this.pokemonModel.find().exec();
  }

  async findOne(id: string) {
    return await this.pokemonModel.findById(id).exec();
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonModel.updateOne(
      {
        _id: id,
      },
      {
        $set: updatePokemonDto,
      },
    );
  }

  async remove(id: string) {
    return await this.pokemonModel.deleteOne({
      _id: id,
    });
  }
}
