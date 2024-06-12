const Game = require('../models/Game');

exports.index = async (req, res) => {
  const games = await Game.findAll();

  if (games.length === 0) return res.status(404).json({ msg: 'Nenhum jogo encontrado' });

  try {
    return res.json({ games });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar jogos.' });
  }
};

exports.getByClassification = async (req, res) => {
  // eslint-disable-next-line max-len
  const games = await Game.findAll({ where: { game_classification: req.params.classification } });

  if (games.length === 0) return res.status(404).json({ msg: 'Nenhum jogo encontrado' });

  try {
    return res.json({ games });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar jogos.' });
  }
};

exports.create = async (req, res) => {
  const {
    game_name,
    game_description,
    game_classification,
  } = req.body;

  if (!game_name || !game_classification || !game_description) {
    return res.status(400).json({ msg: 'Você deve preencher todos os campos' });
  }

  try {
    const game = await Game.create({
      game_name,
      game_description,
      game_classification,
    });

    return res.json({ game });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao adicionar jogo.' });
  }
};

exports.update = async (req, res) => {
  const {
    game_name,
    game_description,
    game_classification,
  } = req.body;

  const game = await Game.findByPk(req.params.id);
  if (!game) return res.status(404).json({ msg: 'Jogo não encontrado.' });

  try {
    const updateFields = {};

    if (game_name) updateFields.game_name = game_name;
    if (game_description) updateFields.game_description = game_description;
    if (game_classification) updateFields.game_classification = game_classification;

    const updatedGame = await game.update(updateFields);

    return res.json(updatedGame);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao atualizar jogo.' });
  }
};
