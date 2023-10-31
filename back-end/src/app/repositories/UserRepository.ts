import { query } from '../../database';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await query(`SELECT * FROM users ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM users WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email: string) {
    const [row] = await query('SELECT * FROM users WHERE email = $1', [email]);
    return row;
  }

  async create({ name, email, password }: IUser) {
    const [row] = await query(`
      INSERT INTO users(name,email,password)
      VALUES($1,$2,$3)
      RETURNING *
    `, [name, email, password]);
    return row;
  }

  async update(id: string, { name, email, password }: IUser) {
    const [row] = await query(`
      UPDATE users
      SET name = $1, email = $2, password = $3
      WHERE id = $4 RETURNING *
    `, [name, email, password, id]);
    return row;
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new UserRepository();