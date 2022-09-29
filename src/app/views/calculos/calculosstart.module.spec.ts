import { CalculosStartModule } from './calculosstart.module';

describe('CalculosStartModule', () => {
  let calculosStartModule: CalculosStartModule;

  beforeEach(() => {
    calculosStartModule = new CalculosStartModule();
  });

  it('should create an instance', () => {
    expect(calculosStartModule).toBeTruthy();
  });
});
