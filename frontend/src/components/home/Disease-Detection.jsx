import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [insights, setInsights] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setCameraActive(false); // Stop camera if file is uploaded
    stopCamera();
  };

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setPreview(null);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera not accessible. Check HTTPS & permissions.");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  // Capture Photo from Camera
  const handleCapture = () => {
    if (!videoRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setPreview(dataUrl);
    setSelectedFile(dataUrl); // Can be sent to backend
    stopCamera();
  };

  // Backend Integration: Detect Disease
  const handleDetect = async () => {
    if (!selectedFile) {
      alert("⚠️ Please select or capture an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/predict_disease`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const resultData = res.data;
      let parsedInsights = {};

      try {
        if (resultData.ai_insights?.ai_text) {
          let cleanText = resultData.ai_insights.ai_text;
          cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
          parsedInsights = JSON.parse(cleanText);
        }
      } catch (error) {
        console.error("❌ Error parsing ai_text:", error);
      }


      setPrediction(resultData.prediction);
      setInsights(parsedInsights);

      navigate("/disease-detail", {
      state: {
        prediction: resultData.prediction,
        insights: parsedInsights,
      },
    })

    } catch (error) {
      console.error("Detection error:", error);
      alert("⚠️ Disease detection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-green-100 to-green-50 p-4">
      <div className="max-w-4xl h-[400px] mx-auto bg-white rounded-2xl shadow-xl p-6 mt-40">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center mt-10">
          🌱 Plant Disease Detection
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Image Upload */}
          <div className="flex-1 p-4 border rounded-xl shadow-sm bg-green-50 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Upload Image</h2>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mb-2 h-48 w-auto rounded-lg object-cover shadow-md"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-white p-2 focus:outline-none"
            />
          </div>

          {/* Camera Capture */}
          <div className="flex-1 p-4 border rounded-xl shadow-sm bg-green-50 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Live Camera</h2>

            {!cameraActive && (
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition mb-2"
              >
                Start Camera
              </button>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-48 rounded-lg object-cover mb-2 ${cameraActive ? "block" : "hidden"}`}
            />

            {cameraActive && (
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleCapture}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Stop
                </button>
              </div>
            )}

            {/* New Input field below camera to show captured image as file */}
            {selectedFile && (
              <div className="w-full mt-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Captured Image File:
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedFile.name}
                  className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleDetect}
          disabled={loading}
          className="w-full md:w-1/2 mx-auto block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition disabled:opacity-50 mb-6"
        >
          {loading ? "Detecting..." : "Detect Disease"}
        </button>

        {/* Dynamic Results
        {prediction && insights && (
          <div className="bg-green-50 p-6 rounded-xl shadow-md mt-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">{prediction.class_name}</h2>
            <p className="text-gray-700 mb-4">{prediction.description}</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">What is this?</h3>
            <p className="text-gray-700 mb-4">{insights.what_is_this}</p>

            {insights.causes && (
              <>
                <h3 className="text-lg font-semibold text-red-600 mb-2">Causes</h3>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  {insights.causes.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}

            {insights.treatment && (
              <>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Treatment</h3>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  {insights.treatment.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}

            {insights.prevention && (
              <>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Prevention</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {insights.prevention.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}
          </div>
        )} */}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
