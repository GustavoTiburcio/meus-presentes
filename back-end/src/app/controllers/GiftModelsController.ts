import express from 'express';
import GiftModelsRepository from '../repositories/GiftModelsRepository';
import {isValidUUIDv4} from '../../utils';

class GiftModelsController {
  async index(request: express.Request, response: express.Response) {
    // List all rows
    const orderBy = request.query?.orderBy;
    const listTypeId = request.query?.listTypeId;

    if (listTypeId && !isValidUUIDv4(listTypeId.toString())) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const giftModels = await GiftModelsRepository.findAll(listTypeId?.toString(), orderBy?.toString());

    response.json(giftModels);
  }

  async show(request: express.Request, response: express.Response) {
    //List specific row by id
    const { id } = request.params;

    if (!isValidUUIDv4(id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const giftModel = await GiftModelsRepository.findById(id);

    if (!giftModel) {
      //404: Not found
      return response.status(404).json({ error: 'Gift model not found' });
    }

    response.json(giftModel);
  }

  async store(request: express.Request, response: express.Response) {
    //Create new row;
    const {
      name,
      list_type_id,
      imageUri,
      electrical,
      voltage
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    if (!list_type_id) {
      return response.status(400).json({ error: 'list_type_id is required' });
    }
    if (electrical && !voltage) {
      return response.status(400).json({ error: 'property voltage is required when electrical is true' });
    }

    const giftModel = await GiftModelsRepository.create({
      name,
      list_type_id,
      imageUri,
      electrical,
      voltage,
    });

    response.status(201).json(giftModel);
  }

  async update(request: express.Request, response: express.Response) {
    // Edit row;
    const { id } = request.params;

    const {
      name,
      list_type_id,
      imageUri,
      electrical,
      voltage
    } = request.body;

    const giftModelExists = await GiftModelsRepository.findById(id);

    if (!giftModelExists) {
      return response.status(404).json({ error: 'Gift model not found.' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }
    if (!list_type_id) {
      return response.status(400).json({ error: 'list_type_id is required' });
    }
    if (electrical && !voltage) {
      return response.status(400).json({ error: 'property voltage is required when electrical is true' });
    }

    const giftModel = await GiftModelsRepository.update(id, {
      name,
      list_type_id,
      imageUri,
      electrical,
      voltage
    });

    response.json(giftModel);
  }

  async delete(request: express.Request, response: express.Response) {
    // Delete row
    const { id } = request.params;

    await GiftModelsRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

export default new GiftModelsController();
