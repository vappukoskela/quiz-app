import React from 'react';
import renderer from 'react-test-renderer';
import ButtonAppBar from '../components/ButtonAppBar.js';

it('renders correctly', () => {
    const tree = renderer.create(<ButtonAppBar />).toJSON();
    expect(tree).toMatchSnapshot();
});