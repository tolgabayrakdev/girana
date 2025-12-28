import pool from '../config/database.js';

export default class UserRepository {
  async findById(id) {
    const query = `
      SELECT id, first_name, last_name, email, phone, is_verified, 
             email_verified, phone_verified, is_banned, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async findByEmail(email) {
    const query = `
      SELECT id, first_name, last_name, email, phone, password, 
             is_verified, email_verified, phone_verified, is_banned, 
             created_at, updated_at
      FROM users
      WHERE email = $1
    `;
    
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  async findByPhone(phone) {
    const query = `
      SELECT id, first_name, last_name, email, phone, password,
             is_verified, email_verified, phone_verified, is_banned,
             created_at, updated_at
      FROM users
      WHERE phone = $1
    `;
    
    const result = await pool.query(query, [phone]);
    return result.rows[0];
  }

  async create(userData, client = null) {
    const { firstName, lastName, email, phone, password } = userData;
    const dbClient = client || pool;
    
    const query = `
      INSERT INTO users (first_name, last_name, email, phone, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, last_name, email, phone, is_verified, created_at
    `;
    
    const result = await dbClient.query(query, [firstName, lastName, email, phone, password]);
    return result.rows[0];
  }

  async update(id, updateData, client = null) {
    const dbClient = client || pool;
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updateData[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, first_name, last_name, email, phone, is_verified, 
                email_verified, phone_verified, is_banned, updated_at
    `;

    const result = await dbClient.query(query, values);
    return result.rows[0];
  }

  async delete(id, client = null) {
    const dbClient = client || pool;
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const result = await dbClient.query(query, [id]);
    return result.rows[0];
  }

  async updateEmailVerification(id, isVerified, token = null, client = null) {
    const dbClient = client || pool;
    
    const query = `
      UPDATE users
      SET email_verified = $1,
          email_verify_token = $2,
          email_verify_token_created_at = CASE WHEN $2 IS NOT NULL THEN NOW() ELSE NULL END,
          updated_at = NOW()
      WHERE id = $3
      RETURNING id, email, email_verified
    `;
    
    const result = await dbClient.query(query, [isVerified, token, id]);
    return result.rows[0];
  }

  async updatePhoneVerification(id, isVerified, token = null, client = null) {
    const dbClient = client || pool;
    
    const query = `
      UPDATE users
      SET phone_verified = $1,
          phone_verify_token = $2,
          phone_verify_token_created_at = CASE WHEN $2 IS NOT NULL THEN NOW() ELSE NULL END,
          updated_at = NOW()
      WHERE id = $3
      RETURNING id, phone, phone_verified
    `;
    
    const result = await dbClient.query(query, [isVerified, token, id]);
    return result.rows[0];
  }
}

