const { Model, DataTypes } = require('sequelize');

class UserImage extends Model {
  static init(sequelize) {
    super.init({
      user_image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_image_path: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'user_image',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_image_fk_user' });
    this.hasOne(models.User, { foreignKey: 'user_fk_image_path' });
  }
}

module.exports = UserImage;
