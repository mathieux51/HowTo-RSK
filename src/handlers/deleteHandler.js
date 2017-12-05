import { Gif } from 'data/models';

export default async function deleteHandler(req, res, next) {
  const isAdmin = req.user.email === process.env.ADMIN_EMAIL;
  if (isAdmin) {
    Gif.destroy({
      where: {
        id: req.body.selectedGifs,
      },
    })
      .then(affectedRows => console.info('affectedRows:', affectedRows))
      .then(() => res.status(200).json({ status: 'ok' }))
      .catch(next);
  }
}
