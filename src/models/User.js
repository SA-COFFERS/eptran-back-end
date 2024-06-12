const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_image_path: DataTypes.STRING,
      user_name: DataTypes.STRING,
      user_lastname: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_birthdate: DataTypes.DATEONLY,
      user_sex: DataTypes.ENUM('male', 'female', 'other'),
      user_education: DataTypes.ENUM('elementary_1', 'elementary_2', 'highschool'),
      user_permission: {
        type: DataTypes.ENUM('adm', 'staff', 'user'),
        defaultValue: 'user',
      },
    }, {
      sequelize,
      tableName: 'user',
    });
  }

  static associate(models) {
    this.hasMany(models.SavedNews, { foreignKey: 'saved_news_fk_user' });
    this.hasMany(models.News, { foreignKey: 'news_fk_user' });
    this.hasMany(models.GameSatistics, { foreignKey: 'game_statistics_fk_user' });
  }
}

module.exports = User;
