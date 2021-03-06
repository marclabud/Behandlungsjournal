import {IData} from '../../src/shared/interface/data';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// ToDo Rating Id new ObjectID
export class IndikatorData implements IData {

  private indikatoren = [
    {
      _id: new ObjectId('5835ec3cf47d103118bbd8ca'),
      name: 'Allgemeinzustand',
      journal_id: new ObjectId('584a5d7a22ba7e1540f5d965'),
      haeufigkeit: {
        morgens: true,
        mittags: false,
        abends: true
      },
      dauer: {
        startDatum: new Date('2016-12-01T07:00:00.000Z'),
        endeDatum: new Date('2016-12-21T17:00:00.000Z')
      }
    },
    {
      _id: new ObjectId('5835ee70f47d103118bbd8cc'),
      name: 'Fieber',
      journal_id: new ObjectId('584a5e6e22ba7e1540f5d966'),
      haeufigkeit: {
        morgens: true,
        mittags: true,
        abends: true
      },
      dauer: {
        startDatum: new Date('2016-12-01T07:00:00.000Z'),
        endeDatum: new Date('2016-12-21T17:00:00.000Z')
      }
    },
    {
      _id: new ObjectId('5835eefdf47d103118bbd8ce'),
      name: 'Augenzustand',
      journal_id: new ObjectId('584a5d7a22ba7e1540f5d965'),
      haeufigkeit: {
        morgens: true,
        mittags: false,
        abends: false
      },
      dauer: {
        startDatum: new Date('2016-12-01T07:00:00.000Z'),
        endeDatum: new Date('2016-12-01T17:00:00.000Z')
      }
    }
  ];

  getData() {
    return this.indikatoren;
  }
}
