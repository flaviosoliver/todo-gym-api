import { TrainingDto } from '../dtos/training.dto';
import { Training } from '../models/training.model';

export const mapTrainings = (training: Training): TrainingDto => {
  return <TrainingDto>{
    id: training.id,
    exerciseId: training.exerciseId,
    series: training.series,
    repetitions: training.repetitions,
    load: training.load,
    done: training.done,
    notes: training.notes,
  };
};
