import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the barcode scanner with proper module resolution
// const BarcodeScanner = dynamic(() =>
//   import("react-qr-barcode-scanner").then(mod => mod.default), 
//   { ssr: false }
// );

const StudentScan = () => {
  const [scanResult, setScanResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = (err, result) => {
    if (result) {
      setScanResult(result.text);
      setErrorMessage(""); 
    } else if (err) {
      console.error(err);
      setErrorMessage("Error scanning. Please try again.");
    }
  };

  const handleSubmitAttendance = () => {
    if (scanResult) {
      alert(`Attendance marked for class: ${scanResult}`);
    } else {
      setErrorMessage("Please scan a valid barcode.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Scan Class QR Code</h1>

      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        
        {/* <BarcodeScanner
          onUpdate={handleUpdate}
          width={300}
          height={300}
          facingMode="environment"
        /> */}

        {scanResult && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            <p>Scanned Class: {scanResult}</p>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>{errorMessage}</p>
          </div>
        )}

        
        <button
          onClick={handleSubmitAttendance}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default StudentScan;
