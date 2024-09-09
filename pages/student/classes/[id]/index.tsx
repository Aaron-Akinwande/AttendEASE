import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import StudentSidebar from "@/components/studentsidebar";
import React from "react";

// Dynamically import the QR/Barcode scanner
const QrBarcodeScanner = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false } // Disable server-side rendering for this component
);

const ScanAttendancePage = () => {
  const router = useRouter();
  const { classId } = router.query;
  const [torchOn, setTorchOn] = React.useState(false);


  const handleUpdate = (err, result) => {
    if (result) {
      // Handle the result of the scan (e.g., submit to API)
      alert(`Scanned successfully for class ID: ${classId}`);
    } else if (err) {
      console.error("Error scanning barcode:", err);
    }
  };

  return (
    <StudentSidebar>
      <div className="p-4 sm:p-6 bg-blue-200 min-h-screen rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Scan Barcode for Class {classId}
        </h1>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Hold your camera to scan the lecturer's barcode
          </h2>
          <div className="scanner-container outline-dashed">
            <QrBarcodeScanner
              onUpdate={handleUpdate}
              width="100%"
              height={300}
              torch={torchOn}
            />
            <button onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? "Off" : "On"}
      </button>
          </div>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default ScanAttendancePage;
