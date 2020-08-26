import { Router } from 'express';

import AuthenticationService from '../services/AuthenticationService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticationService = new AuthenticationService();

    const { user, token } = await authenticationService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.json(error.message);
  }
});

export default sessionsRouter;
