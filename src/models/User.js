const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: DataTypes.STRING,
      user_lastname: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_birthdate: DataTypes.DATEONLY,
      user_sex: DataTypes.ENUM('male', 'female', 'other'),
      user_education: DataTypes.ENUM('elementary_1', 'elementary_2', 'highschool'),
      user_permission: DataTypes.ENUM('adm', 'staff', 'user'),
    }, {
      sequelize,
      tableName: 'user',
    });
  }

  static associate(models) {
    this.belongsTo(models.UserImage, { foreignKey: 'user_fk_image_path' });
    this.hasMany(models.UserImage, { foreignKey: 'user_image_fk_user' });
  }
}

module.exports = User;
