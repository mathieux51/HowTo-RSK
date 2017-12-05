import { Gif } from 'data/models';

export default async function dbHandler(req, res, next) {
  if (req.file.size) {
    const id = res.locals.fileId;
    Gif.create({
      id,
      title: req.body.title,
      description: req.body.description || '',
      location: `gifs/${res.locals.fileName}`,
      createdBy: req.user.email,
    })
      .then(() => res.json({ id }))
      .catch(next);
  }
}
