import component from "."

test('component Exist', ()=> {
    expect(component()).toBe('Hello, WebPack!')
})