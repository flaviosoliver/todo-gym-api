import { ParamsDto } from '../dtos/params.dto';

export const buildParams = (params?: ParamsDto): any => {
  const opt: any = { $or: [] };

  if (params && params.userId) {
    opt.$or.push({ userId: params.userId });
  }

  if (params && params.name) {
    opt.$or.push({ name: { $regex: params.name, $options: 'i' } });
  }

  if (params && params.focusMuscle?.length > 0) {
    opt.$or.push({ focusMuscle: { $in: params.focusMuscle } });
  } else {
    opt.$or.focusMuscle = [];
  }

  return opt;
};
