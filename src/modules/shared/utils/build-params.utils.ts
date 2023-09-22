import { ParamsDto } from '../dtos/params.dto';

export const buildParams = (params?: ParamsDto): any => {
  const opt: any = { $or: [], $and: [] };

  if (params && params.userId) {
    opt.$or.push({ userId: params.userId });
  }

  if (params && params.name) {
    opt.$and.push({ name: { $regex: params.name, $options: 'i' } });
  } else {
    delete opt.$and;
  }

  if (params && params.focusMuscle?.length > 0) {
    opt.$or.push({ focusMuscle: { $in: params.focusMuscle } });
  } else {
    opt.$or.focusMuscle = [];
  }

  if (opt.$or && opt.$or.length == 0) {
    delete opt.$or;
  }

  return opt;
};
