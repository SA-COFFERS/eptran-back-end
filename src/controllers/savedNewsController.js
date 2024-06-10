const SavedNews = require('../models/SavedNews');
const News = require('../models/News');
const User = require('../models/User');

exports.index = async (req, res) => {
    const savedNews = SavedNews.findAll({where:{ saved_news_fk_user: req.userId}});
    if (savedNews.length === 0) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

    try {
        return res.json({savedNews})
    } catch (error) {
        return res.status(500).json({msg: 'Erro ao puxar notícias salvas.'})
    }
}

exports.save = async (req, res) => {
    const news = await News.findByPk(req.params.newsId);
    if (!news) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

    try {
        const savedNews = await SavedNews.create({
            saved_news_fk_user = req.userId,
            saved_news_fk_news = news.news_id
        });

        return res.json({savedNews});
    } catch (error) {
        return res.status(500).json({msg: 'Erro ao salvar notícia.'})
    }
}

exports.delete = async (req, res) => {
    const savedNews = SavedNews.findOne({where: {saved_news_fk_news: req.params.newsId, saved_news_fk_user: req.userId}})
    if (!savedNews) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

    try {
        const deletedSavedNews = savedNews.destroy();
    } catch (error) {
        return res.status(500).json({msg: 'Erro ao cancelar salvamento.'})
    }
}