const {
  Model, DataTypes,
} = require('sequelize');

class GameStatistics extends Model {
  static init(sequelize) {
    super.init({
      game_statistics_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      game_statistics_time_spent: DataTypes.TIME,
      game_statistics_progress: DataTypes.INTEGER,
      game_statistics_fatest_time: DataTypes.TIME,
    }, {
      sequelize,
      tableName: 'game_statistics',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'game_statistics_fk_user' });
    this.belongsTo(models.Game, { foreignKey: 'game_statistics_fk_game' });
  }
}

module.exports = GameStatistics;
