import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateAvatarUserService from '@modules/users/services/update-avatar-user.service';

export default class UpdateAvatarUserController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateAvatarUserService);
    const user = await service.execute({
      user_id: req.user.id,
      avatar: req.file?.filename ?? '',
    });
    return res.json(classToClass(user));
  }
}
