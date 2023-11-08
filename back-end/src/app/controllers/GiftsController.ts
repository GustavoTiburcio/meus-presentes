import express from 'express';
import GiftsRepository from '../repositories/GiftsRepository';
import { isValidUUIDv4 } from '../../utils';
import GiftListRepository from '../repositories/GiftListRepository';

class GiftModelsController {
  async index(request: express.Request, response: express.Response) {
    // List all rows
    const orderBy = request.query?.orderBy;
    const giftListId = request.query?.giftListId;

    if (giftListId && !isValidUUIDv4(giftListId.toString())) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const gifts = await GiftsRepository.findAll(giftListId?.toString(), orderBy?.toString());

    response.json(gifts);
  }

  async show(request: express.Request, response: express.Response) {
    //List specific row by id
    const { id } = request.params;

    if (!isValidUUIDv4(id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const gift = await GiftsRepository.findById(id);

    if (!gift) {
      //404: Not found
      return response.status(404).json({ error: 'Gift not found' });
    }

    response.json(gift);
  }

  async store(request: express.Request, response: express.Response) {
    //Create new row;
    const {
      name,
      imageUri,
      electrical,
      voltage,
      gift_list_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    if (!gift_list_id) {
      return response.status(400).json({ error: 'gift_list_id is required' });
    }
    if (!isValidUUIDv4(gift_list_id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }
    if (electrical && !voltage) {
      return response.status(400).json({ error: 'property voltage is required when electrical is true' });
    }

    const giftListExists = await GiftListRepository.findById(gift_list_id);

    if (!giftListExists) {
      return response.status(404).json({ error: 'Gift list not found.' });
    }

    const gift = await GiftsRepository.create({
      name,
      imageUri,
      electrical,
      voltage,
      gift_list_id,
    });

    response.status(201).json(gift);
  }

  async update(request: express.Request, response: express.Response) {
    // Edit row;
    const { id } = request.params;

    if (!isValidUUIDv4(id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const {
      name,
      imageUri,
      electrical,
      voltage,
      gift_list_id,
    } = request.body;

    const giftExists = await GiftsRepository.findById(id);

    if (!giftExists) {
      return response.status(404).json({ error: 'Gift not found.' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }
    if (electrical && !voltage) {
      return response.status(400).json({ error: 'property voltage is required when electrical is true' });
    }

    const giftModel = await GiftsRepository.update(id, {
      name,
      imageUri,
      electrical,
      voltage
    });

    response.json(giftModel);
  }

  async delete(request: express.Request, response: express.Response) {
    // Delete row
    const { id } = request.params;

    if (!isValidUUIDv4(id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    await GiftsRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

export default new GiftModelsController();
