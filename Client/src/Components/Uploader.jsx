import React, { useEffect, useState } from 'react';
import axios from "axios";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

const Uploader = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState(null);
    const [image, setImage] = useState();
    const [filename, setFilename] = useState("No Selected File");
    const [modalVisible, setModalVisible] = useState(false);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [quality, setQuality] = useState(100); // Quality state

    useEffect(() => {
        if (file) {
            setImage(URL.createObjectURL(file));
            setFilename(file.name);
        }
    }, [file]);

    const upload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        // Append format, width, height, and quality to the form data
        if (format) formData.append('format', format);
        if (width) formData.append('width', width);
        if (height) formData.append('height', height);
        if (quality) formData.append('quality', quality); // Append quality
        console.log(`Width: ${width}, Height: ${height}, Quality: ${quality}`);

        try {
            const res = await axios.post('/Api/Upload/Converted', formData, { responseType: 'blob' });

            const blob = new Blob([res.data], { type: res.headers['content-Type'] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `output.${format ? format.toLowerCase() : 'jpg'}`; // Default to jpg if no format
            document.body.appendChild(a);
            a.click();
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    const formatChangeHandler = (e) => {
        setFormat(e.target.value);
    };

    const handleResize = () => {
        console.log(`Width: ${width}, Height: ${height}`);
        setModalVisible(false);
    };

    return (
        <main className="flex flex-col items-center bg-gradient-to-b from-indigo-100 to-blue-200 p-6 rounded-lg shadow-lg">
            <div
                onClick={() => document.querySelector("input").click()}
                className='flex cursor-pointer flex-col justify-center items-center border-2 border-dashed border-[#1475cf] h-[300px] w-[600px] max-w-full rounded-lg transition-transform transform hover:scale-105 hover:border-blue-400 duration-300 ease-in-out'>
                <input
                    className='input hidden'
                    type="file"
                    onChange={(event) => {
                        setFile(event.target.files[0]);
                        setFilename(event.target.files[0]?.name);
                    }}
                />
                {image ? (
                    <div className='p-4 rounded-full border-2 border-[#1475c7] bg-white shadow-md'>
                        <TiTick size={100} color='green' />
                    </div>
                ) : (
                    <>
                        <MdCloudUpload color='#1475c7' size={60} />
                        <p className='text-lg font-semibold text-gray-700'>Browse Files To Upload</p>
                    </>
                )}
            </div>
            {file && ( // Show format selection only if a file is selected
                <section className='my-3 flex gap-4 justify-between items-center py-3 px-4 rounded bg-[#e9f0ff] shadow-md'>
                    <span className='flex items-center'>
                        <AiFillFileImage size={25} color='#1475cf' />
                        <select className='ml-3 rounded border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={formatChangeHandler}>
                            <option>Select format</option>
                            <option>jpeg</option>
                            <option>png</option>
                            <option>webp</option>
                            <option>gif</option>
                            <option>tiff</option>
                        </select>
                    </span>
                </section>
            )}
            <span className='flex items-center'>
                <span className='font-medium'>{filename}</span>
                <div className='p-1 ml-2 rounded-full border-[#1475cf] border-2 cursor-pointer transition-transform transform hover:scale-110' onClick={() => {
                    setFilename('No Selected File');
                    setImage(null);
                    setFile(null);
                }}>
                    <MdDelete color="#1475cf" />
                </div>
            </span>
            <div className='flex gap-4 justify-center items-center text-center'>
                <button
                    type='button'
                    className={`border-2 border-[#1474cf] p-2 font-bold rounded-full transition-colors duration-300 ease-in-out ${file ? "bg-blue-500 text-white hover:bg-blue-600" : "hidden"}`}
                    onClick={upload}
                >
                    Convert
                </button>
                <button
                    type='button'
                    className={`border-2 border-[#1474cf] p-2 font-bold rounded-full transition-colors duration-300 ease-in-out ${file ? "bg-green-500 text-white hover:bg-green-600" : "hidden"}`}
                    onClick={() => setModalVisible(true)}
                >
                    Resize
                </button>
            </div>

            {/* Quality Input */}
            {file && (
                <div className='my-3'>
                    <label className='block mb-2 text-gray-700 font-medium'>Quality (1-100):</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Math.min(100, Math.max(1, e.target.value)))}
                        className="border border-gray-300 rounded p-1 w-24"
                    />
                </div>
            )}

            {/* Modal for Resize */}
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Resize Image</h2>
                        <label className="block mb-2">
                            Width:
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className="border border-gray-300 rounded p-1 w-full"
                            />
                        </label>
                        <label className="block mb-2">
                            Height:
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="border border-gray-300 rounded p-1 w-full"
                            />
                        </label>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleResize}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => setModalVisible(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Uploader;
