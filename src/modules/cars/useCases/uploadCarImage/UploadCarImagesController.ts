import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface File {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as File[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const imageNames = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      carId: id,
      imageNames,
    });

    return res.status(201).send();
  }
}
