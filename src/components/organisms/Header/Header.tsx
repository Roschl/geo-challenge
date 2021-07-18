import { Flex } from './styles';
import Link from 'next/link';

import { Container } from 'Atoms/Container';

const Header = () => {
	return (
		<header>
			<Container>
				<Flex>
					<h1>
						<Link href="/">
							<a>Geo Challenge</a>
						</Link>
					</h1>
				</Flex>
			</Container>
		</header>
	);
};

export { Header };
