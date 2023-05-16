import { classNames } from './classnames';

describe('classnames', () => {
    test('with first param', () => {
        expect(classNames('someClass'))
            .toBe('someClass');
    });

    test('with additional class', () => {
        expect(classNames('someClass', {}, ['class1', 'class2']))
            .toBe('someClass class1 class2');
    });

    test('with mods false', () => {
        expect(classNames('someClass', { hovered: true, scrollable: false }, ['class1', 'class2']))
            .toBe('someClass class1 class2 hovered');
    });

    test('with mods', () => {
        expect(classNames('someClass', { hovered: true, scrollable: true }, ['class1', 'class2']))
            .toBe('someClass class1 class2 hovered scrollable');
    });
});
