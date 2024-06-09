const { Model, DataTypes } = require('sequelize');

class SavedNews extends Model {
  static init(sequelize) {
    super.init({
      saved_news_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    }, {
      sequelize,
      tableName: 'saved_news',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'saved_news_fk_user' });
    this.belongsTo(models.News, { foreignKey: 'saved_news_fk_news' });
  }
}

module.exports = SavedNews;
