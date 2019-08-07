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

export const VerticalLineContainer = styled.div`
    display: flex
    justify-content: center
    align-items: center;
`;

export const VerticalLine = styled.div`
  border-left: 2px solid gray;
  height: calc(95vh - 64px);
`;