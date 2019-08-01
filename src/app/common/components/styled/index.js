import styled from 'styled-components';
import { Row } from 'antd';
export const FullPage = styled.div`
    height: 100vh;
    width: 100vw;
`;

export const DefinedRow = styled(Row)`
    height: ${props => props.height || '100vh' };
    width: ${props => props.width || '100vw' };
    flex-direction: ${props => props.direction || 'row'}
`;