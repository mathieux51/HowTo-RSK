import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';

export default function fileHandler(req, res, next) {
  if (req.file.size) {
    const destination = 'public/gifs/';
    res.locals.fileId = v4();
    res.locals.fileName = res.locals.fileId + req.file.detectedFileExtension;
    const finalPath = path.join(destination, res.locals.fileName);
    const outStream = fs.createWriteStream(finalPath);
    console.warn(
      'fileHandler',
      'res.locals.fileId',
      res.locals.fileId,
      'res.locals.fileName',
      res.locals.fileName,
    );
    req.file.stream.pipe(outStream);
    outStream.on('error', next);
    outStream.on('finish', next);
  }
}
