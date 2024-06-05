/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('news', {
      news_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      news_fk_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'user', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      news_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      news_subtitle: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      news_first_paragraph: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      news_second_paragraph: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      news_third_paragraph: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      news_fourth_paragraph: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      news_fifth_paragraph: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      news_image_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('news');
  },
};
