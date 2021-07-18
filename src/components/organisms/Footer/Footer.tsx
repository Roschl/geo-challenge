import { Flex, StyledFooter } from './styles';

import { Container } from 'Atoms/Container';

const Footer = () => {
	return (
		<StyledFooter>
			<Container>
				<Flex>
					<span>&copy; {new Date().getFullYear()} Geo Challenge</span>
				</Flex>
			</Container>
		</StyledFooter>
	);
};

export { Footer };
