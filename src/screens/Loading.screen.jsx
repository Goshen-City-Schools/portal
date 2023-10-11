import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen({ navigateToPath, timer = 3000 }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading by setting a timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      navigate(navigateToPath);
    }, timer); // Redirect to /auth after 3 seconds

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, [navigate]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
          {/* You can add a loading spinner or animation here */}
        </div>
      ) : null}
    </div>
  );
}
