/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_statistics', {
      game_statistics_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      game_statistics_fk_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'user', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      game_statistics_fk_game: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'game', key: 'game_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      game_statistics_time_spent: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      game_statistics_progress: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      game_statistics_fastest_time: {
        type: Sequelize.TIME,
        allowNull: true,
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
    await queryInterface.dropTable('game_statistics');
  },
};
