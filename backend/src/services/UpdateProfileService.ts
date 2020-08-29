import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  name: string;
  last_name: string;
  biography: string;
  whatsapp: string;
}

class UpdateProfileService {
  public async execute({
    user_id, name, last_name, biography, whatsapp,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (biography.length > 300) {
      throw new AppError('The biography cant be bigger than 300 caracters', 406);
    }

    user.name = name;
    user.last_name = last_name;
    user.biography = biography;
    user.whatsapp = whatsapp;

    usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
