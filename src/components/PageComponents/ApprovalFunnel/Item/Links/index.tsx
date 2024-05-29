import { BsLink45Deg } from 'react-icons/bs';
import { Counter, LinksContainer } from './styles';

export const Links= ({ linksCount, display }): JSX.Element => {
    return (
        <LinksContainer display={display}>
            <BsLink45Deg size={22}/>
            <Counter>{linksCount}</Counter>
        </LinksContainer>
    )
}