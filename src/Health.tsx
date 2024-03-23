import { useEffect, useState } from "react";

interface HealthStatus {
  status: string;
}

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/health`)
      .then((response) => response.json())
      .then((data: HealthStatus) => setStatus(data.status))
      .catch((error) => console.error("Error fetching health status:", error));
  }, []);

  return (
    <div>
      <h2>Application Health: {status}</h2>
    </div>
  );
};

export default HealthCheck;
