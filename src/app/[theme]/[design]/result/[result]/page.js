import Result from '@/components/Result';
import React from 'react';

function ResultPage() {
    return (
        <div className="result-page-container" style={{ 
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            zIndex: 1
        }}>
            <Result />
        </div>
    );
}

export default ResultPage;
