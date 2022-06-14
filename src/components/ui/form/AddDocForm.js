import React, { useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";

import { storage } from "../../utils/firebase";
import InputDocs from "../drop-file-input/InputDocs";

function AddDocForm() {
  const [filesToUpload, setFilesToUpload] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.state?.docPackage || "";
  const fromPage = location.state?.from || "/";

  const onFileChange = (files) => {
    setFilesToUpload(files);
  };

  const uploadDocuments = () => {
    filesToUpload.forEach((file) => {
      const docRef = ref(storage, `${path}/${file.name}`);
      uploadBytes(docRef, file).then(() => {
        console.log("Document Uploaded");
      });
    });
  };

  const handleClick = () => {
    if (filesToUpload[0]) {
      uploadDocuments();
      navigate(fromPage, { replace: true });
    } else {
      alert("Сначала выберите файлы для загрузки!");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBottom: `25px` }}
        onClick={handleClick}
      >
        Нажмите, чтобы отправить файлы
      </Button>
      <InputDocs onFileChange={(files) => onFileChange(files)} />
    </div>
  );
}

export default AddDocForm;
