import { UtcTimezonePipe } from './utc-timezone.pipe';

describe('UTC Timezone Pipe', () => {
  let pipe: UtcTimezonePipe;
  const timeString = '2018-12-12 12:00:00';

  beforeEach(() => {
    pipe = new UtcTimezonePipe();
  });

  /**
   * test if the time string is converted to iso format
   */
  it('should add +00:00 to the time string', () => {
    expect(pipe.transform(timeString)).toEqual(timeString.replace(/\s/, 'T') + '+00:00');
  });
});
