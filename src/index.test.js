import component from '.';

describe('Component', () => {
  it('should exist', () => {
    expect(component()).toBe('Hello, WebPack!');
  });

  it('should return a string', () => {
    expect(typeof component()).toBe('string');
  });
});