import { Gif } from 'data/models';

export default async function dbHandler(req, res, next) {
  if (req.file.size) {
    Gif.create({
      id: res.locals.fileId,
      title: req.body.title,
      description: req.body.description || '',
      location: `gifs/${res.locals.fileName}`,
      created_by: req.user.id,
    })
      .then(() => res.json({ id: res.locals.fileId }))
      .catch(next);
  }
}
