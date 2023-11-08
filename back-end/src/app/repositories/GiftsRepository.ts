import { query } from '../../database';
import { TGiftModel } from './GiftModelsRepository';

type IGiftBase = Omit<TGiftModel, 'list_type_id'>;

interface IGift extends IGiftBase {
  gift_list_id?: string;
  requested_amount?: number;
  confirmed_amount?: number;
  color?: string;
  observation?: string;
}

class GiftsRepository {
  async findAll(giftListId = '', orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (giftListId) {
      const rows = await query(`SELECT * FROM gifts WHERE gift_list_id=$1 ORDER BY name ${direction}`, [giftListId]);
      return rows;
    }

    const rows = await query(`SELECT * FROM gifts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM gifts WHERE id = $1', [id]);
    return row;
  }

  async create({
    name,
    image_uri,
    electrical,
    voltage,
    requested_amount,
    color,
    observation,
    gift_list_id,
  }: IGift) {
    const [row] = await query(`
      INSERT INTO gifts(name, image_uri, electrical, voltage, requested_amount, color, observation, gift_list_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [name, image_uri, electrical, voltage, requested_amount, color, observation, gift_list_id]);
    return row;
  }

  async update(id: string, {
    name,
    image_uri,
    electrical,
    voltage,
    requested_amount,
    color,
    observation,
  }: IGift) {
    const [row] = await query(`
      UPDATE gifts
      SET name = $1, image_uri = $2, electrical = $3, voltage = $4, requested_amount = $5, color = $6, observation = $7
      WHERE id = $8 RETURNING *
    `, [name, image_uri, electrical, voltage, requested_amount, color, observation, id]);
    return row;
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM gifts WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new GiftsRepository();