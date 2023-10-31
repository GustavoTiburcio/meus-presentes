import { query } from '../../database';

class LoginRepository {
  async findByEmailAndPassword(email: string, password: string){
    const [row] = await query('SELECT id, name, email FROM users WHERE email = $1 AND password = $2', [email, password]);
    return row;
  }
}

export default new LoginRepository();