import { query } from '../../database';

type TGiftModelBase = {
  id?: string;
  name: string;
  list_type_id: string;
  image_uri?: string;
  electrical: boolean;
  voltage: string;
  created_at?: Date;
}

type TGiftModelElectrical = TGiftModelBase & {
  electrical: true;
  voltage: '220v' | '110v' | '24v' | '12v' | '';
};

type TGiftModelNonElectrical = TGiftModelBase & {
  electrical?: false;
  voltage?: never;
};

export type TGiftModel = TGiftModelElectrical | TGiftModelNonElectrical;

class GiftModelsRepository {
  async findAll(listTypeId = '', orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (listTypeId) {
      const rows = await query(`SELECT * FROM gift_models WHERE list_type_id=$1 ORDER BY name ${direction}`, [listTypeId]);
      return rows;
    }

    const rows = await query(`SELECT * FROM gift_models ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM gift_models WHERE id = $1', [id]);
    return row;
  }

  async create({
    name,
    list_type_id,
    image_uri,
    electrical,
    voltage,
  }: TGiftModel) {
    const [row] = await query(`
      INSERT INTO gift_models(name, list_type_id, image_uri, electrical, voltage)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, list_type_id, image_uri, electrical, voltage]);
    return row;
  }

  async update(id: string, {
    name,
    list_type_id,
    image_uri,
    electrical,
    voltage
  }: TGiftModel) {
    const [row] = await query(`
      UPDATE gift_models
      SET name = $1, list_type_id = $2, image_uri = $3, electrical = $4, voltage = $5
      WHERE id = $6 RETURNING *
    `, [name, list_type_id, image_uri, electrical, voltage, id]);
    return row;
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM gift_models WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new GiftModelsRepository();