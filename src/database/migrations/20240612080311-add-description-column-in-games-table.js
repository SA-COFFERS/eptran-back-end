module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'game',
      'game_description',
      {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('game', 'game_description');
  },
};
