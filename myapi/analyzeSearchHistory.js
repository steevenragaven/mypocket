const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pocketmart',
  password: '12345678',
  port: 5432,
});


async function analyzeSearchHistory(userId, query) {
  const client = await pool.connect();

  try {
    // Analyze search history for the specific user
    const recommendationsQuery = `
      SELECT p.productid
      FROM products p
      WHERE p.name ILIKE $1
      ORDER BY p.name
      LIMIT 10
    `;
    const recommendationsResult = await client.query(recommendationsQuery, [`%${query}%`]);
    const recommendations = recommendationsResult.rows;

    // Upsert recommendations for the user
    const upsertRecommendations = `
      INSERT INTO recommendations (user_id, product_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, product_id)
      DO NOTHING
    `;
    const upsertPromises = recommendations.map(rec =>
      client.query(upsertRecommendations, [userId, rec.productid])
    );
    await Promise.all(upsertPromises);
  } catch (error) {
    console.error('Error analyzing search history:', error);
  } finally {
    client.release();
  }
}

module.exports = analyzeSearchHistory;
