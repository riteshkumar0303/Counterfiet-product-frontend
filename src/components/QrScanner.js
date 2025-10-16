import React, { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QrScannerComponent = (props) => {

  const [data, setData] = useState('');

  useEffect(() => {
    console.info(data);
    props.passData(data);
  }, [data, props]);

  const handleScan = (result) => {
    if (result) {
      setData(result.text || result);
    }
  };

  const handleError = (err) => {
    // Optionally handle errors
    console.error(err);
  };

  return (
    <>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </>
  );
};

export default QrScannerComponent;

