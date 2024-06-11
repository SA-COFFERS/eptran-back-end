const SavedNews = require('../models/SavedNews');
const News = require('../models/News');

exports.index = async (req, res) => {
  const savedNews = await SavedNews.findAll({ where: { saved_news_fk_user: req.userId } });
  if (savedNews.length === 0) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

  try {
    return res.json({ savedNews });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao puxar notícias salvas.' });
  }
};
exports.save = async (req, res) => {
  const news = await News.findByPk(req.params.newsId);
  if (!news) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

  if (await SavedNews.findOne({ where: { saved_news_fk_news: news.news_id } })) {
    return res.status(400).json({ msg: 'Essa notícia já foi salva.' });
  }

  try {
    const savedNews = await SavedNews.create({
      saved_news_fk_user: req.userId,
      saved_news_fk_news: news.news_id,
    });

    return res.json({ savedNews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Erro ao salvar notícia.' });
  }
};

exports.delete = async (req, res) => {
  const savedNews = await SavedNews.findOne({
    where: {
      saved_news_fk_news: req.params.newsId, saved_news_fk_user: req.userId,
    },
  });
  if (!savedNews) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

  try {
    const deletedSavedNews = await savedNews.destroy();

    return res.json({ deletedSavedNews });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao cancelar salvamento.' });
  }
};
