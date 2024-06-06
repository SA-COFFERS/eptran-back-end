/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_fk_image_path: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'user_image', key: 'user_image_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      user_sex: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      user_education: {
        type: Sequelize.ENUM('elementary_1', 'elementary_2', 'highschool'),
        allowNull: false,
      },
      user_permission: {
        type: Sequelize.ENUM('adm', 'staff', 'user'),
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
    await queryInterface.dropTable('user');
  },
};
