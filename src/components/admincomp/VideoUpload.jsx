import React, { useState, useEffect } from "react";
import "./VideoUpload.css"; // Import CSS

const VideoUpload = ({ onVideoUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [videos, setVideos] = useState([]); // Store uploaded videos

  // Fetch the uploaded videos from the backend
  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/videos");
      const data = await response.json();
      if (response.ok) {
        setVideos(data);
      } else {
        setMessage("Failed to fetch video list.");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setMessage("Error fetching video list.");
    }
  };

  useEffect(() => {
    fetchVideos(); // Fetch the list of videos when the component mounts
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      setMessage("Please select a valid video file.");
    }
  };

  // Handle title change
  const handleTitleChange = (e) => setTitle(e.target.value);

  // Handle description change
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Reset fields after successful upload
  const resetFields = () => {
    setTitle("");
    setDescription("");
    setVideoFile(null);
  };

  // Handle form submission (upload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !title || !description) {
      setMessage("Please fill in all the fields.");
      return;
    }

    setIsLoading(true);
    setMessage(""); // Reset previous messages

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("title", title);
      formData.append("description", description);

      const response = await fetch("http://localhost:5000/video/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Upload successful!");
        resetFields();
        fetchVideos(); // Fetch updated video list after successful upload

        if (typeof onVideoUpload === "function") {
          onVideoUpload(result.video.fileUrl);
        }
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Error uploading video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle video deletion
  const handleDelete = async (videoId, videoFileUrl) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmDelete) {
      try {
        setIsLoading(true);
        // Send DELETE request to the backend to delete video from Cloudflare and Firebase
        const response = await fetch(
          `http://localhost:5000/video/delete/${videoId}`,
          {
            method: "DELETE",
            body: JSON.stringify({ fileUrl: videoFileUrl }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          setMessage("Video deleted successfully!");
          fetchVideos(); // Refresh the video list
        } else {
          throw new Error("Failed to delete video");
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        setMessage("Error deleting video. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Video</h2>
      {message && (
        <p className={`upload-message ${isLoading ? "loading" : ""}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter video title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter video description"
            required
          />
        </div>
        <div className="form-group">
          <label>Video File:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="upload-button" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h3>Uploaded Videos</h3>
      <table className="video-table">
        <thead>
          <tr>
            <th>Video Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>
                <button
                  onClick={() => handleDelete(video.id, video.fileUrl)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoUpload;
