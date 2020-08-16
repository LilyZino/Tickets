import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './App';
import './styles.css';
import 'raleway-webfont';

const FullScreenedApp = styled(App)`
    height: 100%
`;

ReactDOM.render(<FullScreenedApp />, document.getElementById('app'));
