import express from 'express';
import ListTypesRepository from '../repositories/ListTypesRepository';

class ListTypesController {
  async index(request: express.Request, response: express.Response) {
    // List all rows
    const orderBy = request.query?.orderBy;

    const listTypes = await ListTypesRepository.findAll(orderBy?.toString());

    response.json(listTypes);
  }
}

export default new ListTypesController();