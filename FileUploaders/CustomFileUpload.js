import React from "react";

const CustomFileUpload = ({ image = false, video = true, changeFile }) => {
    const changePhoto = (event) => {
        if (video) {
            if (!isVideo(event.target.files[0].name)) {
                event.preventDefault();
                alert("فایل وئدیو موجود نیست");
                return;
            }
        }
        if (image) {
            if (!isImage(event.target.files[0].name)) {
                event.preventDefault();
                alert("فایل تصویر موجود نیست");
                return;
            }
        }
        changeFile(event.target.files[0]);
    };
    function getExtension(filename) {
        var parts = filename.split(".");
        return parts[parts.length - 1];
    }
    function isImage(filename) {
        var ext = getExtension(filename)
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true;
        }
        return false
    }
    function isVideo(filename) {
        var ext = getExtension(filename)
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                return true;
        }
        return false
    }
    return (
        <div>
            <input
                type="file"
                onChange={(event) => changePhoto(event)}
                className="form-control"
            />
        </div>
    );
};

export default CustomFileUpload;
