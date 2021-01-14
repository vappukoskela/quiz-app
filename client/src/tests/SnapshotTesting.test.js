import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SnapshotTesting from '../TestsDemo/SnapshotTesting.js';

// palauttaa aina success - testit toimii
test('this test will run successfully', () => {
    expect(true).toBe(true)
})

// renderöi oletuksena oikein, ei kaadu
it('renders correctly', () => {
    const tree = renderer.create(<SnapshotTesting/>).toJSON()
    expect(tree).toMatchSnapshot();
})

// ottaa propsin ja renderöi vaihtoehtoisen pathin oikein
it('says goodbye', () => {
    const tree = renderer.create(<SnapshotTesting sayGoodbye={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

// etsii <h1> -elementin ja tutkii sitä
it('renders title', () => {
    render(<SnapshotTesting/>);
    const title = screen.getByText('Hello world');
    console.log(title) // pitäisi olla h1-elementti
    expect(title).toMatchSnapshot()
})


