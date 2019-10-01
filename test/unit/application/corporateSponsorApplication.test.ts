import { CorporateSponsorApplication } from '../../../src/application/corporateSponsorApplication';
import { CorporateSponsor } from '../../../src/common/interface/sheet-interface';

describe('CorporateSponsorApplication Test', () => {
  const beforeData: CorporateSponsor[] = require('../../data/corporateSponsorBeforeList.json');
  const afterData: CorporateSponsor[] = require('../../data/corporateSponsorAfterList.json');
  it('sortedList test', () => {
    const app = new CorporateSponsorApplication();
    expect(app['sortedList'](beforeData)).toEqual(afterData);
  });
});
