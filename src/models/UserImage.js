const { Model, DataTypes } = require('sequelize');

class UserImage extends Model {
  static init(sequelize) {
    super.init({
      user_image_path: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'user_image_fk_user', as: 'user' });
    this.belongsToMany(models.User, { foreignKey: 'user_image_path', as: 'user' });
  }
}

module.exports = UserImage;
