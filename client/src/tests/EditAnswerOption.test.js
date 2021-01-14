import React from 'react';
import renderer from 'react-test-renderer';
import EditAnswerOption from '../components/EditAnswerOption.js';

// Komponentti joka vaatii propsit renderöityäkseen oikein!

// FAIL: ei propseja. Checkboxin checked-value on undefined - ei renderöidy!
// it('renders correctly', () => {
//     const tree = renderer.create(<EditAnswerOptionu />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

it('renders correctly with props', () => {
    const value = {id: 0, correct: false, selected: false}
    const tree = renderer.create(<EditAnswerOption value={value} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly when checkbox correct', () => {
    const value = {id: 0, correct: true, selected: false}
    const tree = renderer.create(<EditAnswerOption value={value}  />).toJSON();
    expect(tree).toMatchSnapshot();
});

