/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('saved_news', 'save_news_id', 'saved_news_id');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('saved_news', 'saved_news_id', 'save_news_id');
  },
};
