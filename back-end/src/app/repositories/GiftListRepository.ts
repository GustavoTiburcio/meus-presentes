import { query } from '../../database';

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


  // async create({ name, email, password }: IUser) {
  //   const [row] = await query(`
  //     INSERT INTO gift_lists(name,email,password)
  //     VALUES($1,$2,$3)
  //     RETURNING *
  //   `, [name, email, password]);
  //   return row;
  // }

  // async update(id: string, { name, email, password }: IUser) {
  //   const [row] = await query(`
  //     UPDATE gift_lists
  //     SET name = $1, email = $2, password = $3
  //     WHERE id = $4 RETURNING *
  //   `, [name, email, password, id]);
  //   return row;
  // }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM gift_lists WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new GiftListRepository();