import { Gif } from 'data/models';

export default async function dbHandler(req, res, next) {
  console.warn(
    'fileHandler',
    'res.locals.fileId',
    res.locals.fileId,
    'res.locals.fileName',
    res.locals.fileName,
  );
  if (req.file.size) {
    const id = res.locals.fileId;
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
