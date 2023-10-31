import { query } from '../../database';

class ListTypesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await query(`SELECT * FROM list_types ORDER BY name ${direction}`);
    return rows;
  }
}

export default new ListTypesRepository();