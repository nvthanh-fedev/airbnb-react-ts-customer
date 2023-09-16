import React, { ChangeEvent } from "react";
import { uploadAvatarAction } from "../../Redux/reducers/userManagementReducer";
import { AppDispatch } from "../../Redux/configStore";
import { useDispatch } from "react-redux";
import styles from "./uploadAvatar.module.css";

const UploadAvatar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file ", file);
      const formData = new FormData();
      formData.append("formFile", file);
      dispatch(uploadAvatarAction(formData))
        .then((response) => {
          console.log("Upload success! Response:", response);
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.inputImage}
        name="Cập nhật ảnh"
      />
    </div>
  );
};

export default UploadAvatar;
