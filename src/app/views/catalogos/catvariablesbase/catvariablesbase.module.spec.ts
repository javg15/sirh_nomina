import { CatvariablesbaseModule } from './catvariablesbase.module';

describe('CatvariablesbaseModule', () => {
  let catvariablesbaseModule: CatvariablesbaseModule;

  beforeEach(() => {
    catvariablesbaseModule = new CatvariablesbaseModule();
  });

  it('should create an instance', () => {
    expect(catvariablesbaseModule).toBeTruthy();
  });
});
