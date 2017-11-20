import multer from 'multer';
import { v4 } from 'uuid';
import mime from 'mime';
import { Gif } from 'data/models';

const storage = multer.diskStorage({
  destination: 'public/gifs/',
  filename(req, file, cb) {
    const fileName = `${v4()}.${mime.getExtension(file.mimetype)}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });

export async function addController(req, res) {
  let id = null;
  if (req.file.size) {
    [id] = req.file.filename.split('.');
    await Gif.create({
      id,
      title: req.body.title,
      description: req.body.description || '',
      location: `gifs/${req.file.filename}`,
      createdBy: req.user.email,
    });
  }
  res.json({ id });
}
