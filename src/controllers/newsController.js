const News = require('../models/News');
const User = require('../models/User');

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
