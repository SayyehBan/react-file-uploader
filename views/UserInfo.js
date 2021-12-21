import axios from "axios";
import React, { useRef, useState } from "react";
import CustomFileUpload from "../FileUploaders/CustomFileUpload";
import ProgressBar from '../ProgressBar/ProgressBar'
const UserInfo = () => {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [userPhoto, setUserPhoto] = useState(null);
    const [previewFile, setPreviewFile] = useState(null)
    const [fileProgess, setFileProgess] = useState(0);
    const [isUpload, setIsUpload] = useState(false);
    const [colorProgress, setColorProgress] = useState("black")
    const changeFile = (file) => {
        setUserPhoto(file)
        setPreviewFile(URL.createObjectURL(file))
    }

    const save = (event) => {
        let formData = new FormData();
        formData.append("UserName", usernameRef.current.value);
        formData.append("Password", passwordRef.current.value);
        formData.append("UserPhoto", userPhoto);
        console.log(formData);
        const apiUrl = "https://localhost:7021/api/User/Post";
        fetch(apiUrl, {
            method: "POST",
            body: formData,
        }).then(function (response) {
            console.log(response.status);
            console.log("response");
            console.log(response);
        });
    };
    const saveWithAxios = () => {
        let formData = new FormData();
        formData.append("UserName", usernameRef.current.value);
        formData.append("Password", passwordRef.current.value);
        formData.append("UserPhoto", userPhoto);
        const apiUrl = "https://localhost:7021/api/User/Post";

        axios.request({
            method: "post",
            url: apiUrl,
            data: formData,
            onUploadProgress: (p) => {
                console.log(p);
                setFileProgess(Math.round((p.loaded / p.total) * 100))
                if (Math.round((p.loaded / p.total) * 100) < 33) {
                    setColorProgress("#FE6F5E")
                }
                else if (Math.round((p.loaded / p.total) * 100) > 34 && Math.round((p.loaded / p.total) * 100) < 64) {
                    setColorProgress("#FFB200")
                }
                else {
                    setColorProgress("#66FF00")
                }
                setIsUpload(true)
                if (p.loaded === p.total) {
                    setIsUpload(false)
                }
            }
        }).then(data => { })
    }
    return (
        <div className="card m-3">

            <div className="card-header">User Info</div>
            <hr />
            <div className="card-body">
                <div className="form-group">
                    <label>نام کاربری : </label>
                    <input ref={usernameRef} className="form-control" />
                </div>
                <div>
                    <label>پسورد : </label>
                    <input ref={passwordRef} type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label>تصویر : </label>
                    <CustomFileUpload image={true}
                        video={false}
                        changeFile={changeFile} />
                    {/* <input type="file" onChange={(event) => changePhoto(event)} /> */}
                    <ProgressBar bgcolor={colorProgress} completed={fileProgess} />
                    <img src={previewFile} style={{ width: "200px" }} />
                </div>
                <div className="form-group">
                    <button disabled={isUpload} className="btn btn-success" onClick={saveWithAxios}>ثبت</button>
                </div>
            </div>

        </div>
    );
};

export default UserInfo;
