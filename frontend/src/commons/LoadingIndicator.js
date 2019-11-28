import React from 'react';
import {Spin, Icon} from 'antd';

export default function LoadingIndicator() {
    const antIcon = <Icon type="loading-3-quarters" style={{fontSize: 50}} spin/>;
    return (
        <Spin indicator={antIcon} style={{display: 'block', textAlign: 'center', marginTop: 50}}/>
    );
}