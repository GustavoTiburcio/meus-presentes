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

  async store(request: express.Request, response: express.Response) {
    //Create new row;
    const {
      name,
      list_type_id,
      event_date,
      expiration_date,
      gifts_voltage,
      delivery_address,
      observation
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
      observation
    });

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
