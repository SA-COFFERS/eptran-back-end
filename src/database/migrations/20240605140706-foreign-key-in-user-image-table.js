/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_image', 'user_image_fk_user', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'user', key: 'user_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user_image', 'user_image_fk_user');
  },
};
