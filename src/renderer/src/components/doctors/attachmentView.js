import React, { useState, useEffect } from "react";
import { getRequest } from "../../utils/axiosRequests";

function AttachmentView({ attachment }) {
  const [fileObject, setFileObject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("attachment: ", attachment);

  useEffect(() => {
    setIsLoading(true);
    if (attachment) {
      console.log("staring call for loading image....");
      getRequest(
        "attachments/" + attachment.id + "?patientId=" + attachment.patientId
      ).then((data) => {
        setIsLoading(false);
        console.log("got filestring and seting start", data.originalname);
        console.log("got filestring and seting end");
        setFileObject(data);
      });
    }
  }, []);

  return (
    <div className="attachemtnView">
      {isLoading && <p>Please wait...</p>}
      {(fileObject?.fileType === ".jpg" ||
        fileObject?.fileType === ".jpeg" ||
        fileObject?.fileType === ".png") && (
        <img
          width="100%"
          alt="Attachment"
          src={"data:image/png;base64," + fileObject?.file}
        />
      )}
      {fileObject?.fileType === ".pdf" && (
        <embed
          src={"data:application/pdf;base64," + fileObject?.file}
          width="100%"
          height="1024px"
        />
      )}
    </div>
  );
}

export default AttachmentView;
