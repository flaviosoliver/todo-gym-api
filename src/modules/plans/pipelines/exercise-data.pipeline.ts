import * as mongoose from 'mongoose';

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
      _id: 1,
      name: 1,
      focusMuscle: 1,
      userId: 1,
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
