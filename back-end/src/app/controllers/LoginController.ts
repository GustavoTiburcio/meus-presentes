import express from 'express';
import LoginRepository from '../repositories/LoginRepository';
import { isEmailValid } from '../../utils';

class LoginController {
  async login(request: express.Request, response: express.Response) {
    //List specific row by id
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }
    if (!isEmailValid(email)) {
      return response.status(400).json({ error: 'Email invalid format' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const user = await LoginRepository.findByEmailAndPassword(email, password);

    if (!user) {
      //401: Unauthorized
      return response.status(401).json({ error: 'Incorrect email or password' });
    }

    response.json(user);
  }
}

export default new LoginController();