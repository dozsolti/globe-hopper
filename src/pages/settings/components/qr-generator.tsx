/* import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/useStore";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

// import { QrReader } from "react-qr-reader";
import { isMobile } from "@/lib/constants"; */

export default function QRGenerator() {
  /*   const { visitedList } = useStore();
  const [showQRCode, setShowQRCode] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);

  const [data, setData] = useState("No result");
/* 
  useEffect(() => {
    if (
      !("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices)
    ) {
      return;
    }

    if (isMobile && showQRCode) {
      //request access for camera
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          alert("Camera access granted");
          // Do something with the stream
          setCameraPermission(true);
        })
        .catch((error) => {
          alert("Got error :" + error);
        });
    }
  }, [showQRCode]); * /

  if (isMobile)
    return (
      <div className="flex flex-col justify-center items-center mb-8 p-4 border rounded-lg w-11/12">
        {showQRCode && cameraPermission && (
          <>
            {/* <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result?.text);
                }

                if (error) {
                  console.info(error);
                }
              }}
              style={{ width: "100%" }}
            /> * /}
            <p>{data}</p>
          </>
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setShowQRCode(!showQRCode)}
        >
          {showQRCode ? "Hide QR Scanner" : "Show QR Scanner"}
        </Button>
      </div>
    );

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-8 p-4 border rounded-lg w-11/12">
        {showQRCode && (
          <QRCode
            value={JSON.stringify(visitedList)}
            level="L"
            style={{ height: "auto", maxWidth: "50%", width: "100%" }}
          />
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setShowQRCode(!showQRCode)}
        >
          {showQRCode ? "Hide QR Code" : "Show QR Code"}
        </Button>
      </div>
    </>
  ); */
  return <p>Comming soon</p>;
}
