const {
  Model, DataTypes,
} = require('sequelize');

class Game extends Model {
  static init(sequelize) {
    super.init({
      game_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      game_name: DataTypes.STRING,
      game_classification: DataTypes.ENUM('elementary_1', 'elementary_2', 'highschool'),
      game_description: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: 'game',
    });
  }

  static associate(models) {
    this.hasMany(models.GameStatistics, { foreignKey: 'game_statistics_fk_game' });
  }
}

module.exports = Game;
