import { query } from '../../database';

interface IGiftList {
  id?: string;
  name: string;
  list_type_id: string;
  event_date: Date;
  expiration_date?: Date | null;
  gifts_voltage: string;
  delivery_address: string;
  observation: string;
  created_at?: Date;
}

class GiftListRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await query(`SELECT * FROM gift_lists ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM gift_lists WHERE id = $1', [id]);
    return row;
  }

  async create({
    name,
    list_type_id,
    event_date,
    expiration_date,
    gifts_voltage,
    delivery_address,
    observation
  }: IGiftList) {
    const [row] = await query(`
      INSERT INTO gift_lists(name, list_type_id, event_date, expiration_date, gifts_voltage, delivery_address, observation)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [name, list_type_id, event_date, expiration_date, gifts_voltage, delivery_address, observation]);
    return row;
  }

  async update(id: string, {
    name,
    list_type_id,
    event_date,
    expiration_date,
    gifts_voltage,
    delivery_address,
    observation
  }: IGiftList) {
    const [row] = await query(`
      UPDATE gift_lists
      SET name = $1, list_type_id = $2, event_date = $3, expiration_date = $4, gifts_voltage = $5, delivery_address = $6, observation = $7
      WHERE id = $8 RETURNING *
    `, [name, list_type_id, event_date, expiration_date, gifts_voltage, delivery_address, observation, id]);
    return row;
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM gift_lists WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new GiftListRepository();