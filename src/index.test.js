const component = require('./index.js');

test('component Exist', ()=> {
    expect(component()).toBe('Hello, WebPack!')
})