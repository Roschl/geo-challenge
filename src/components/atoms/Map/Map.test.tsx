import Map from '../Map';
import { render } from '@testing-library/react';

describe('Map', () => {
	it('renders correctly', () => {
		const { container } = render(<Map />);
		expect(container).toMatchSnapshot();
	});
});
