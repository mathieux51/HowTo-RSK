import { Gif } from 'data/models';

export default async function dbHandler(req, res, next) {
  if (req.file.size) {
    const id = res.locals.fileId;
    console.warn('id', id);
    Gif.create({
      id,
      title: req.body.title,
      description: req.body.description || '',
      location: `gifs/${res.locals.fileName}`,
      created_by: req.user.id,
    })
      .then(() => res.json({ id }))
      .catch(next);
  }
}
