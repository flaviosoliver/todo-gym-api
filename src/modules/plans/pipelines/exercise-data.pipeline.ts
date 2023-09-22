import * as mongoose from 'mongoose';
import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { plansBuildParams } from '../utils/plans-build-params.utils';

export const exerciseDataPipeline = (field: string, value: string): any => [
  {
    $match: {
      [field]: new mongoose.Types.ObjectId(value),
    },
  },
  {
    $unwind: '$training',
  },
  {
    $lookup: {
      from: 'exercises',
      localField: 'training.exerciseId',
      foreignField: '_id',
      as: 'exerciseDetails',
    },
  },
  {
    $unwind: '$exerciseDetails',
  },
  {
    $project: {
      _id: 1,
      name: 1,
      focusMuscle: 1,
      userId: 1,
      expiresIn: 1,
      training: {
        exerciseId: '$exerciseDetails._id',
        series: '$training.series',
        repetitions: '$training.repetitions',
        load: '$training.load',
        done: '$training.done',
        createdAt: '$training.createdAt',
        updatedAt: '$training.updatedAt',
        exerciseName: '$exerciseDetails.name',
        exerciseFocusMuscle: '$exerciseDetails.focusMuscle',
        exerciseImage: '$exerciseDetails.image',
        exerciseVideo: '$exerciseDetails.video',
        notes: {
          $concat: ['$training.notes', '\n', '$exerciseDetails.notes'],
        },
      },
    },
  },
  {
    $group: {
      _id: '$_id',
      name: {
        $first: '$name',
      },
      focusMuscle: {
        $first: '$focusMuscle',
      },
      userId: {
        $first: '$userId',
      },
      expiresIn: {
        $first: '$expiresIn',
      },
      training: {
        $push: '$training',
      },
      exerciseDetails: {
        $push: '$exerciseDetails',
      },
    },
  },
  {
    $project: {
      _id: 0,
      id: {
        $cond: {
          if: { $eq: ['$type', 'string'] },
          then: { $substr: ['$_id', 0, -1] },
          else: '$_id',
        },
      },
      name: 1,
      focusMuscle: 1,
      userId: 1,
      expiresIn: 1,
      training: {
        $map: {
          input: '$training',
          as: 't',
          in: {
            $mergeObjects: [
              '$$t',
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$exerciseDetails',
                      as: 'e',
                      cond: {
                        $eq: ['$$e._id', '$$t.exerciseId'],
                      },
                    },
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
    },
  },
];

export const plansByParamsPipeline = (params?: ParamsDto): any => {
  const pipeline = [
    {
      $match: {
        ...plansBuildParams(params),
      },
    },
    {
      $unwind: '$training',
    },
    {
      $lookup: {
        from: 'exercises',
        localField: 'training.exerciseId',
        foreignField: '_id',
        as: 'exerciseDetails',
      },
    },
    {
      $unwind: '$exerciseDetails',
    },
    {
      $project: {
        _id: 1,
        name: 1,
        focusMuscle: 1,
        userId: 1,
        expiresIn: 1,
        training: {
          exerciseId: '$exerciseDetails._id',
          series: '$training.series',
          repetitions: '$training.repetitions',
          load: '$training.load',
          done: '$training.done',
          createdAt: '$training.createdAt',
          updatedAt: '$training.updatedAt',
          exerciseName: '$exerciseDetails.name',
          exerciseFocusMuscle: '$exerciseDetails.focusMuscle',
          exerciseImage: '$exerciseDetails.image',
          exerciseVideo: '$exerciseDetails.video',
          notes: {
            $concat: ['$training.notes', '\n', '$exerciseDetails.notes'],
          },
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        name: {
          $first: '$name',
        },
        focusMuscle: {
          $first: '$focusMuscle',
        },
        userId: {
          $first: '$userId',
        },
        expiresIn: {
          $first: '$expiresIn',
        },
        training: {
          $push: '$training',
        },
        exerciseDetails: {
          $push: '$exerciseDetails',
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: {
          $cond: {
            if: { $eq: ['$type', 'string'] },
            then: { $substr: ['$_id', 0, -1] },
            else: '$_id',
          },
        },
        name: 1,
        focusMuscle: 1,
        userId: 1,
        expiresIn: 1,
        training: {
          $map: {
            input: '$training',
            as: 't',
            in: {
              $mergeObjects: [
                '$$t',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$exerciseDetails',
                        as: 'e',
                        cond: {
                          $eq: ['$$e._id', '$$t.exerciseId'],
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
  ];

  return pipeline;
};
