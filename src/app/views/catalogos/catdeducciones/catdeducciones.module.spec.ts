import { CatdeduccionesModule } from './catdeducciones.module';

describe('CatdeduccionesModule', () => {
  let catdeduccionesModule: CatdeduccionesModule;

  beforeEach(() => {
    catdeduccionesModule = new CatdeduccionesModule();
  });

  it('should create an instance', () => {
    expect(catdeduccionesModule).toBeTruthy();
  });
});
