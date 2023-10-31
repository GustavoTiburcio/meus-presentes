import UserRepository from '../repositories/UserRepository';

class UserController {
  async index(request: any, response: any) {
    const users = await UserRepository.findAll();

    response.json(users);
  }

  async store(request: any, response: any) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const user = await UserRepository.create({ name, email, password });

    response.status(201).json(user);
  }
}

export default new UserController();
