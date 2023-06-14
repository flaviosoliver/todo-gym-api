import { ExerciseDto } from '../dtos/exercise.dto';
import { Exercise } from '../exercise.model';

export const mapExercise = (exercise: Exercise): ExerciseDto => {
  return <ExerciseDto>{
    id: exercise.id,
    name: exercise.name,
    focusMuscle: exercise.focusMuscle,
    image: exercise.image,
    video: exercise.video,
    notes: exercise.notes,
  };
};
