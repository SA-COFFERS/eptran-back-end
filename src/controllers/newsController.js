const fs = require('fs');
const News = require('../models/News');
const User = require('../models/User');

exports.index = async (req, res) => {
  const news = await News.findAll();
  if (news.length === 0) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

  try {
    return res.json({ news });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar notícia.' });
  }
};

exports.show = async (req, res) => {
  const news = await News.findByPk(req.params.id);
  if (!news) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

  try {
    return res.json({ news });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar notícia.' });
  }
};

exports.getByUserId = async (req, res) => {
  const news = await News.findAll({ where: { news_fk_user: req.params.id } });
  if (news.length === 0) return res.status(404).json({ msg: 'Nenhuma notícia encontrada.' });

  try {
    return res.json({ news });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar notícias.' });
  }
};

exports.create = async (req, res) => {
  const {
    news_title,
    news_subtitle,
    news_first_paragraph,
    news_second_paragraph,
    news_third_paragraph,
    news_fourth_paragraph,
    news_fifth_paragraph,
  } = req.body;

  const user = await User.findByPk(req.userId);
  if (!user) return res.status(400).json({ msg: 'Usuário inválido.' });

  // Validate if not null fields wont be null
  if (!news_title) return res.status(400).json({ msg: 'Adicione um título.' });
  if (!news_subtitle) return res.status(400).json({ msg: 'Adicione um subtítulo.' });
  if (!news_first_paragraph) return res.status(400).json({ msg: 'Adicione pelo menos um parágrafo.' });

  const { file } = req;
  if (!file) return res.status(400).json({ msg: 'Adicione uma imagem.' });

  try {
    const news = await News.create({
      news_title,
      news_subtitle,
      news_first_paragraph,
      news_second_paragraph,
      news_third_paragraph,
      news_fourth_paragraph,
      news_fifth_paragraph,
      news_image_path: file.path,
      news_fk_user: user.user_id,
    });

    return res.json({ news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Erro ao adicionar notícia.' });
  }
};

exports.update = async (req, res) => {
  const {
    news_title,
    news_subtitle,
    news_first_paragraph,
    news_second_paragraph,
    news_third_paragraph,
    news_fourth_paragraph,
    news_fifth_paragraph,
  } = req.body;

  const news = await News.findByPk(req.params.id);
  if (!news) return res.status(404).json({ msg: 'Notícia não encontrada.' });
  if (req.userPermission === 'staff' && req.userId !== news.news_fk_user) {
    return res.status(401).json({ msg: 'Não foi você que escreveu essa notícia' });
  }

  const { file } = req;

  try {
    const updateFields = {}; // creating a variable to ensure that any field is uptaded incorrectly

    // validating each field and adding on the object that will be updated
    if (news_title) updateFields.news_title = news_title;
    if (news_subtitle) updateFields.news_subtitle = news_subtitle;
    if (news_first_paragraph) updateFields.news_first_paragraph = news_first_paragraph;
    if (news_second_paragraph) updateFields.news_second_paragraph = news_second_paragraph;
    if (news_third_paragraph) updateFields.news_third_paragraph = news_third_paragraph;
    if (news_fourth_paragraph) updateFields.news_fourth_paragraph = news_fourth_paragraph;
    if (news_fifth_paragraph) updateFields.news_fifth_paragraph = news_fifth_paragraph;
    if (file) {
      // fuction to remove image from uploads before setting a new path
      const deleteFile = (filePath) => {
      // eslint-disable-next-line consistent-return
        fs.unlink(filePath, (error) => {
          if (error) {
            // eslint-disable-next-line no-useless-return
            return;
          }
        });
      };

      deleteFile(news.news_image_path); // call the delete fuction and give the path to delete them
      updateFields.news_image_path = file.path;
    }

    const updatedNews = await news.update(updateFields);

    return res.json(updatedNews);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao atualizar notícia.' });
  }
};

exports.delete = async (req, res) => {
  const news = await News.findByPk(req.params.id);
  if (!news) return res.status(404).json({ msg: 'Notícia não encontrada.' });
  if (req.userPermission === 'staff' && req.userId !== news.news_fk_user) {
    return res.status(401).json({ msg: 'Não foi você que escreveu essa notícia' });
  }

  // fuction to remove image from uploads before deleting the news
  const deleteFile = (filePath) => {
    // eslint-disable-next-line consistent-return
    fs.unlink(filePath, (error) => {
      if (error) return res.status(500).json({ msg: 'Erro ao excluir a imagem.' });
    });
  };

  deleteFile(news.news_image_path); // call the delete fuction and give the path to delete them

  try {
    const deletedNews = await news.destroy();
    return res.json({ deletedNews });
  } catch (error) {
    return res.json({ msg: 'Erro ao deletar notícia.' });
  }
};
