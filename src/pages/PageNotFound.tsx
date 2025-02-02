import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [history]);

    return (
        <div className="text-center mt-12 pt-12">
            <h1 className="text-2xl font-bold">Oops! This page is still under builds</h1>
            <p className="mt-4">You will be redirected to the homepage in 3 seconds...</p>
        </div>
    );
};

export default PageNotFound;