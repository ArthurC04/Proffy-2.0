import { Router } from 'express';

import AuthenticationService from '../services/AuthenticationService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationService = new AuthenticationService();

  const { user, token } = await authenticationService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
