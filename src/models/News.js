const { Model, DataTypes } = require('sequelize');

class News extends Model {
  static init(sequelize) {
    super.init({
      news_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      news_image_path: DataTypes.STRING,
      news_title: DataTypes.STRING,
      news_subtitle: DataTypes.TEXT,
      news_first_paragraph: DataTypes.TEXT,
      news_second_paragraph: DataTypes.TEXT,
      news_third_paragraph: DataTypes.TEXT,
      news_fourth_paragraph: DataTypes.TEXT,
      news_fifth_paragraph: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: 'news',
    });
  }

  static associate(models) {
    this.hasMany(models.SavedNews, { foreignKey: 'saved_news_fk_news' });
    this.belongsTo(models.User, { foreignKey: 'news_fk_user' });
  }
}

module.exports = News;
