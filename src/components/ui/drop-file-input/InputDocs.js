import React, { useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

import {
  SFileInput,
  SFileInputLabel,
  SFilePreview,
  SFilePreviewItem,
  SFilePreviewItemDelete,
  SFilePreviewItemInfo,
  SFilePreviewTitle,
} from "./style";
import { ImageConfig } from "./config/ImageConfig";
import uploadImg from "../../../assets/cloud-upload-regular-240.png";

const InputDocs = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <SFileInput
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <SFileInputLabel>
          <img src={uploadImg} alt="" />
          <p>Перетащите сюда файлы (или нажмите на картинку)</p>
        </SFileInputLabel>
        <input type="file" value="" onChange={onFileDrop} />
      </SFileInput>
      {fileList.length > 0 ? (
        <SFilePreview>
          <SFilePreviewTitle>Готово к отправке</SFilePreviewTitle>
          {fileList.map((item, index) => (
            <SFilePreviewItem key={index}>
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <SFilePreviewItemInfo>
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </SFilePreviewItemInfo>
              <SFilePreviewItemDelete onClick={() => fileRemove(item)}>
                <MdDeleteOutline />
              </SFilePreviewItemDelete>
            </SFilePreviewItem>
          ))}
        </SFilePreview>
      ) : null}
    </>
  );
};

export default InputDocs;
