import express from 'express';
import GiftListRepository from '../repositories/GiftListRepository';
import UserRepository from '../repositories/UserRepository';
import { sendEmail } from '../../utils';

class GiftListControllers {
  async index(request: express.Request, response: express.Response) {
    // List all rows
    const orderBy = request.query?.orderBy;
    const userId = request.query?.userId;

    const giftLists = await GiftListRepository.findAll(userId?.toString(), orderBy?.toString());

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

  async store(request: express.Request, response: express.Response) {
    //Create new row;
    const {
      name,
      list_type_id,
      event_date,
      expiration_date,
      gifts_voltage,
      delivery_address,
      observation,
      user_id
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    if (!list_type_id) {
      return response.status(400).json({ error: 'list_type_id is required' });
    }
    if (!event_date) {
      return response.status(400).json({ error: 'event_date is required' });
    }

    const giftList = await GiftListRepository.create({
      name,
      list_type_id,
      event_date,
      expiration_date,
      gifts_voltage,
      delivery_address,
      observation,
      user_id
    });


    if (giftList) {
      const user = await UserRepository.findById(giftList.user_id);

      if (user) {

        sendEmail({
          receiver: user.email,
          subject: 'MeusPresentes.com.br - Sua lista já está disponível!! 🎉',
          body: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Sua Lista de Presentes ${giftList.name} já está disponível</title>
            </head>
            <body>
                <h1>Sua Lista de Presentes ${giftList.name} já está disponível 🎉</h1>
                <p>
                    Oi ${user.name}! 🌟<br><br>
                    Sua lista de presentes foi criada e já está acessível em www.meuspresentes.com.br/${giftList.id}
                </p>
                <p>Copie e envie o link acima para os seus convidados.</p>
                <p>Um grande abraço,</p>
                <p>Gustavo Tiburcio 😎<br>Desenvolvedor 🚀<br>MeusPresentes.com.br 🎊</p>
            </body>
            </html>
        `
        });
      }
    }

    response.status(201).json(giftList);
  }

  async update(request: express.Request, response: express.Response) {
    // Edit row;
    const { id } = request.params;

    const {
      name,
      list_type_id,
      event_date,
      expiration_date,
      gifts_voltage,
      delivery_address,
      observation
    } = request.body;

    const giftListExists = await GiftListRepository.findById(id);

    if (!giftListExists) {
      return response.status(404).json({ error: 'Gift list not found.' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }
    if (!list_type_id) {
      return response.status(400).json({ error: 'list_type_id is required' });
    }
    if (!event_date) {
      return response.status(400).json({ error: 'event_date is required' });
    }

    const contact = await GiftListRepository.update(id, {
      name,
      list_type_id,
      event_date,
      expiration_date,
      gifts_voltage,
      delivery_address,
      observation
    });

    response.json(contact);
  }

  async delete(request: express.Request, response: express.Response) {
    // Delete row
    const { id } = request.params;

    await GiftListRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

export default new GiftListControllers();
