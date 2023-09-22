import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import * as mongoose from 'mongoose';

export const plansBuildParams = (params?: ParamsDto): any => {
  const opt: any = { $or: [], $and: [] };

  if (params && params.userId) {
    opt.$and.push({ userId: new mongoose.Types.ObjectId(params.userId) });
  }

  if (params && params.name) {
    opt.$and.push({ name: { $regex: params.name, $options: 'i' } });
  }

  if (params && params.focusMuscle?.length > 0) {
    opt.$and.push({ focusMuscle: { $in: params.focusMuscle } });
  } else {
    opt.$or.focusMuscle = [];
  }

  if (params && params.expiresIn) {
    opt.$and.push({ expiresIn: { $gte: new Date(params.expiresIn) } });
  }

  if (opt.$or && opt.$or.length == 0) {
    delete opt.$or;
  }

  return opt;
};
