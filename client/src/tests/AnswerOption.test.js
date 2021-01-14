import React from 'react';
import renderer from 'react-test-renderer';
import AnswerOption from '../components/AnswerOption.js';

// Komponentti joka vaatii propsit renderöityäkseen oikein!

// FAIL: ei propseja. Checkboxin checked-value on undefined - ei renderöidy!

// it('renders correctly', () => {
//     const tree = renderer.create(<AnswerOption />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

it('renders correctly with props', () => {
    const value = {id: 0, correct: false, selected: false}
    const tree = renderer.create(<AnswerOption value={value} answersVisible={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('does not show answer when answers not visible', () => {
    const value = {id: 0, correct: false, selected: false}
    const tree = renderer.create(<AnswerOption value={value} answersVisible={false} />).toJSON();
    expect(tree).toMatchSnapshot();
});
