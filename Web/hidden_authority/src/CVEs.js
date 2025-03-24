import React from 'react';
import './CVEs.css';  

function CVEs() {
  const cves = [
    { id: 'CVE-2021-44228', description: 'Log4Shell vulnerability in Apache Log4j.' },
    { id: 'CVE-2020-1472', description: 'Netlogon Elevation of Privilege Vulnerability.' },
    { id: 'CVE-2017-0144', description: 'EternalBlue exploit used in WannaCry ransomware.' },
  ];

  return (
    <div className="cves-container">
      <h2>Common CVEs</h2>
      <ul>
        {cves.map((cve) => (
          <li key={cve.id}>
            <strong>{cve.id}</strong>: {cve.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CVEs;