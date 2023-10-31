import { query } from '../../database';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserRepository {
  async findAll() {
    const rows = await query('SELECT * FROM users ORDER BY name');
    return rows;
  }
  async create({ name, email, password }: IUser) {
    const [row] = await query(`
      INSERT INTO users(name,email,password)
      VALUES($1,$2,$3)
      RETURNING *
    `, [name, email, password]);
    return row;
  }
}

export default new UserRepository();