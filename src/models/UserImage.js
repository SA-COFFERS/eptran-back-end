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
    this.belongsTo(models.User, { foreignKey: 'user_image_fk_user' });
  }
}

module.exports = UserImage;
