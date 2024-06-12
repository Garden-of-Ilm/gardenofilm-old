import React, {useEffect, useRef, useState} from "react";
import AudioUploadStyles from "./audio-upload.module.css";
import {CloudUploadIcon, UploadIcon} from "@/icons";
import AudioCard from "@/sections/dashboard/fatwa-create/audio-upload/audio-card";
import axiosInstance from "@/api";
import {useFormContext} from "react-hook-form";
import {Audio} from "@/api/fatwa-res";

interface Props {
    audios: Audio[] | [];
}

function AudioUpload({ audios }: Props) {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<any>([]);
    const [completed, setCompleted] = useState<number[]>([]);
    const [loadings, setLoadings] = useState<boolean[]>([])


    const {setValue} = useFormContext();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const selectedFileArray = Array.from(selectedFiles).map((file) =>
                Object.assign(file, {
                    url: URL.createObjectURL(file),
                    filename: file.name,
                }),
            );

            const newFiles = selectedFileArray.concat(files);
            setFiles(newFiles);
            handleUploadFiles(selectedFileArray);
        }
    };


    const handleUploadFiles = async (selectedFiles: File[]) => {
        const totalFiles = selectedFiles.length + files.length;
        const newCompleted = Array.from({length: totalFiles}, () => 0);

        for (let i = 0; i < selectedFiles.length; i += 1) {
            const formData = new FormData();
            formData.append("file", selectedFiles[i]);
            const newLoadings = [...loadings]
            newLoadings[i] = true
            setLoadings(newLoadings)
            await axiosInstance
                .post("/files/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        if (!progressEvent.total) return;
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total,
                        );
                        if (percentCompleted !== newCompleted[i]) {
                            newCompleted[i] = percentCompleted;
                            setCompleted([...newCompleted]);
                        }
                    },
                })
                .then((res) => {
                    const newLoadings = [...loadings]
                    newLoadings[i] = false
                    setLoadings(newLoadings)
                    setValue(`audios.${files.length + i}`, res.data.data);
                })
                .catch((err) => {
                    console.error(`File ${i + 1} upload failed:`, err);
                });
        }
    };

    const handleRemoveAudio = (existFile: any) => {
        const newFiles = files.filter(
            (file: any) => file.filename !== existFile.filename,
        );
        const newFilesIds = newFiles?.map((file: any) => file._id);
        setFiles(newFiles);
        setValue("audios", newFilesIds);
    };

    useEffect(() => {
        if (files.length === 0) {
            setFiles(audios);
        }
    }, [audios]);

    return (
        <div className={AudioUploadStyles.audioUploadWrapper}>
            <input
                type="file"
                accept="audio/*"
                multiple={true}
                ref={fileRef}
                onChange={handleChange}
                className={AudioUploadStyles.audioFileUploadInput}
            />
            <div className={AudioUploadStyles.audioUploadIcon}>
                <CloudUploadIcon/>
            </div>
            <h4 className={AudioUploadStyles.audioUploadTitle}>Choose an audio</h4>
            <p className={AudioUploadStyles.audioDescription}>
                Audio should be related to the fatwa only
            </p>

            <button
                type="button"
                onClick={() => fileRef?.current?.click()}
                className={AudioUploadStyles.audioUploadBtn}
            >
                <UploadIcon/>
                <span>Upload file</span>
            </button>

            {Object.keys(files).map((key, index) => (
                <AudioCard
                    // @ts-ignore
                    audio={files[key]}
                    loading={loadings[index] ?? false}
                    completed={completed[index]}
                    index={index}
                    handleRemoveAudio={() => handleRemoveAudio(files[key])}
                    key={index}
                />
            ))}
        </div>
    );
}

export default AudioUpload;