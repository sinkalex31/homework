import createObjectKeyMirror from './createObjectKeyMirror';

describe('createObjectKeyMirror', () => {
    it('should produce key/value mirrored object from array', () => {
        const a = 'a';
        const b = 'b';
        expect(createObjectKeyMirror([a, b])).toEqual({ a, b });
    });
});

