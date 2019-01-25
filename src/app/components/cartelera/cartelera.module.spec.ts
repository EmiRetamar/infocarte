import { CarteleraModule } from './cartelera.module';

describe('CarteleraModule', () => {
  let carteleraModule: CarteleraModule;

  beforeEach(() => {
    carteleraModule = new CarteleraModule();
  });

  it('should create an instance', () => {
    expect(carteleraModule).toBeTruthy();
  });
});
