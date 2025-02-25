import { Injectable, Type } from '@angular/core';
import * as _ from 'lodash';
import { intervalExercise } from './exercises/IntervalExercise/intervalExercise';
import Exercise from './Exercise';
import { Platform } from '@ionic/angular';
import { triadInversionExercise } from './exercises/TriadInversionExercise/triadInversionExercise';
import { chordsInRealSongsExercise } from './exercises/ChordsInRealSongsExercise/chordsInRealSongsExercise';
import { notesWithChordsExercise } from './exercises/NotesWithChords/notesWithChordsExercise';
import { notesInKeyExercise } from './exercises/NotesInKeyExercise/notesInKeyExercise';
import { chordTypeExercise } from './exercises/ChordTypeInKeyExercise/chordTypeInKeyExercise';
import { chordInKeyExercise } from './exercises/ChordInKeyExercise/chordsInKeyExercise';
import { commonChordProgressionExercise } from './exercises/CommonChordProgressionExercise/commonChordProgressionsExercise';
import IExercise = Exercise.Exercise;

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  static readonly _exerciseList: IExercise[] = [
    notesInKeyExercise(),
    chordInKeyExercise(),
    commonChordProgressionExercise(),
    chordsInRealSongsExercise(),
    chordTypeExercise(),
    notesWithChordsExercise(),
    triadInversionExercise(),
    intervalExercise(),
  ];
  private readonly _exerciseIdToExercise = _.keyBy(
    ExerciseService._exerciseList,
    'id'
  );
  static readonly ngComponents: Type<any>[] = ExerciseService._exerciseList
    .map((exercise) => exercise.explanation)
    .filter(
      (explanation): explanation is Type<any> =>
        !!explanation && typeof explanation != 'string'
    );

  constructor(private readonly _platform: Platform) {}

  getExercise(id: string): IExercise {
    return this._exerciseIdToExercise[id];
  }

  getExerciseList(): IExercise[] {
    return ExerciseService._exerciseList.filter(
      (exercise: IExercise) =>
        !exercise.blackListPlatform ||
        !this._platform.is(exercise.blackListPlatform)
    );
  }
}
