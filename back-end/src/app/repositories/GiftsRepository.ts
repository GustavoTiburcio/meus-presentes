import { query } from '../../database';
import { TGiftModel } from './GiftModelsRepository';

type IGiftBase = Omit<TGiftModel, 'list_type_id'>;

interface IGift extends IGiftBase {
  gift_list_id?: string;
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
    imageUri,
    electrical,
    voltage,
    gift_list_id,
  }: IGift) {
    const [row] = await query(`
      INSERT INTO gifts(name, image_uri, electrical, voltage, gift_list_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, imageUri, electrical, voltage, gift_list_id]);
    return row;
  }

  async update(id: string, {
    name,
    imageUri,
    electrical,
    voltage
  }: IGift) {
    const [row] = await query(`
      UPDATE gifts
      SET name = $1, image_uri = $2, electrical = $3, voltage = $4
      WHERE id = $5 RETURNING *
    `, [name, imageUri, electrical, voltage, id]);
    return row;
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM gifts WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new GiftsRepository();