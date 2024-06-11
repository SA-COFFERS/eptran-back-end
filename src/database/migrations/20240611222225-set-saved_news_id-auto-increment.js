module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE saved_news
      MODIFY COLUMN saved_news_id INT AUTO_INCREMENT
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE saved_news
      MODIFY COLUMN saved_news_id INT
    `);
  },
};
