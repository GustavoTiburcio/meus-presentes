import express from 'express';
import GiftListRepository from '../repositories/GiftListRepository';

class GiftListControllers {
  async index(request: express.Request, response: express.Response) {
    // List all rows
    const orderBy = request.query?.orderBy;

    const giftLists = await GiftListRepository.findAll(orderBy?.toString());

    response.json(giftLists);
  }

  async show(request: express.Request, response: express.Response) {
    //List specific row by id
    const { id } = request.params;

    const giftList = await GiftListRepository.findById(id);

    if (!giftList) {
      //404: Not found
      return response.status(404).json({ error: 'Gift list not found' });
    }

    response.json(giftList);
  }

  // async store(request: express.Request, response: express.Response) {
  //   //Create new row;
  //   const { name, email, password } = request.body;

  //   if (!name) {
  //     return response.status(400).json({ error: 'Name is required' });
  //   }
  //   if (!email) {
  //     return response.status(400).json({ error: 'Email is required' });
  //   }
  //   if (!isEmailValid(email)) {
  //     return response.status(400).json({ error: 'Email invalid format' });
  //   }
  //   if (!password) {
  //     return response.status(400).json({ error: 'Password is required' });
  //   }

  //   const userExists = await UserRepository.findByEmail(email);

  //   if (userExists) {
  //     return response.status(400).json({ error: 'This e-mail already in use.' });
  //   }

  //   const user = await UserRepository.create({ name, email, password });

  //   response.status(201).json(user);
  // }

  // async update(request: express.Request, response: express.Response) {
  //   // Edit row;
  //   const { id } = request.params;

  //   const {
  //     name, email, password
  //   } = request.body;

  //   const userExists = await UserRepository.findById(id);
  //   if (!userExists) {
  //     return response.status(404).json({ error: 'User not found.' });
  //   }
  //   if (!name) {
  //     return response.status(400).json({ error: 'Name is required.' });
  //   }
  //   if (!email) {
  //     return response.status(400).json({ error: 'Email is required' });
  //   }
  //   if (!isEmailValid(email)) {
  //     return response.status(400).json({ error: 'Email invalid format' });
  //   }
  //   if (!password) {
  //     return response.status(400).json({ error: 'Password is required' });
  //   }

  //   const userByEmail = await UserRepository.findByEmail(email);

  //   if (userByEmail && userByEmail.id !== id) {
  //     return response.status(400).json({ error: 'This e-mail already in use.' });
  //   }

  //   const contact = await UserRepository.update(id, {
  //     name, email, password
  //   });

  //   response.json(contact);
  // }

  async delete(request: express.Request, response: express.Response) {
    // Delete row
    const { id } = request.params;

    await GiftListRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

export default new GiftListControllers();
