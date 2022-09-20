import { CapturasStartModule } from './capturasstart.module';

describe('CapturasStartModule', () => {
  let capturasStartModule: CapturasStartModule;

  beforeEach(() => {
    capturasStartModule = new CapturasStartModule();
  });

  it('should create an instance', () => {
    expect(capturasStartModule).toBeTruthy();
  });
});
