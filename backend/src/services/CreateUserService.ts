import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

class AuthenticationService {
  public async execute({
    name, last_name, email, password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      last_name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default AuthenticationService;
