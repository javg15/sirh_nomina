import { CatpercepcionesModule } from './catpercepciones.module';

describe('CatpercepcionesModule', () => {
  let catpercepcionesModule: CatpercepcionesModule;

  beforeEach(() => {
    catpercepcionesModule = new CatpercepcionesModule();
  });

  it('should create an instance', () => {
    expect(catpercepcionesModule).toBeTruthy();
  });
});
