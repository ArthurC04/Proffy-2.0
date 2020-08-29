import { Router } from 'express';

import multer from 'multer';
import { getRepository } from 'typeorm';
import User from '../models/User';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';
import UpdateProfileService from '../services/UpdateProfileService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const {
    name, last_name, email, password,
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name, last_name, email, password,
  });

  delete user.password;
  return response.json(user);
});

usersRouter.put('/profile', ensureAuthenticated, async (request, response) => {
  const {
    name, last_name, biography, whatsapp,
  } = request.body;
  const updateProfile = new UpdateProfileService();

  const user = await updateProfile.execute({
    user_id: request.user.id,
    name,
    last_name,
    biography,
    whatsapp,
  });

  delete user.password;
  return response.json(user);
});

usersRouter.get('/profile/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);

  try {
    const user = await usersRepository.findOne(id);

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(404).json({ err: 'This profile does not exists' });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
