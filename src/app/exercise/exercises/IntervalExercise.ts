import * as _ from 'lodash';
import { Exercise, } from '../Exercise';
import {
  randomFromList,
  NotesRange,
  toNoteName
} from '../utility';
import { NoteNumber } from '../utility/music/notes/NoteNumberOrName';
import { BaseCommonSettingsExercise } from './BaseCommonSettingsExercise';

type Interval = 'Minor 2nd' | 'Major 2nd' | 'Minor 3rd' | 'Major 3rd' | 'Perfect 4th' | 'Aug 4th' | 'Perfect 5th' | 'Minor 6th' | 'Major 6th' | 'Minor 7th' | 'Major 7th' | 'Octave';

interface IIntervalDescriptor {
  name: Interval;
  semitones: number;
}

const intervalDescriptorList: IIntervalDescriptor[] = [
  {
    name: 'Minor 2nd',
    semitones: 1,
  },
  {
    name: 'Major 2nd',
    semitones: 2,
  },
  {
    name: 'Minor 3rd',
    semitones: 3,
  },
  {
    name: 'Major 3rd',
    semitones: 4,
  },
  {
    name: 'Perfect 4th',
    semitones: 5,
  },
  {
    name: 'Aug 4th',
    semitones: 6,
  },
  {
    name: 'Perfect 5th',
    semitones: 7,
  },
  {
    name: 'Minor 6th',
    semitones: 8,
  },
  {
    name: 'Major 6th',
    semitones: 9,
  },
  {
    name: 'Minor 7th',
    semitones: 10,
  },
  {
    name: 'Major 7th',
    semitones: 11,
  },
  {
    name: 'Octave',
    semitones: 12,
  },
]

export class IntervalExercise extends BaseCommonSettingsExercise<Interval> {
  readonly name: string = 'Interval Recognition';
  readonly description: string = 'Recognizing Intervals without context';
  readonly range = new NotesRange('C3', 'E5');

  getQuestion(): Exercise.Question<Interval> {
    const randomIntervalDescriptor: IIntervalDescriptor = randomFromList(intervalDescriptorList.filter(intervalDescriptor => this._settings.includedAnswers.includes(intervalDescriptor.name)));
    const randomStartingNote: NoteNumber = _.random(this.range.lowestNoteNumber, this.range.highestNoteNumber - randomIntervalDescriptor.semitones);
    return {
      segments: [{
        rightAnswer: randomIntervalDescriptor.name,
        partToPlay: _.shuffle([
          toNoteName(randomStartingNote),
          toNoteName(randomStartingNote + randomIntervalDescriptor.semitones),
        ]),
      }],
    }
  }

  protected _getAllAnswersList(): Exercise.AnswerList<Interval> {
    return _.map(intervalDescriptorList, 'name');
  }
}
