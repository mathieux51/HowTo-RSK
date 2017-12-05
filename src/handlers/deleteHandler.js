import { Gif } from 'data/models';

import { Op } from 'sequelize';

export default function deleteHandler(req, res, next) {
  const isAdmin = req.user.email === process.env.ADMIN_EMAIL;
  if (isAdmin) {
    Gif.destroy({
      where: {
        id: {
          [Op.or]: req.body,
        },
      },
    })
      .then(affectedRows => console.info('affectedRows:', affectedRows))
      .then(() => res.status(200).json({ status: 'ok' }))
      .catch(next);
  }
}
