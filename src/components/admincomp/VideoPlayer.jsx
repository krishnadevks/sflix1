import React, { useState, useEffect } from "react";
import "./VideoPlayer.css"; // Import CSS

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]); // Store video data
  const [selectedVideo, setSelectedVideo] = useState(null); // Current video to play
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false); // Show video modal

  // Fetch video list from the backend
  const fetchVideos = async () => {
    try {
      setLoading(true); // Start loading
      setError(""); // Reset error before new fetch

      const response = await fetch("http://localhost:5000/videos"); // Corrected endpoint
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setVideos(data);

      // If there are videos, set the first one as the default
      if (data.length > 0) {
        setSelectedVideo(data[0].fileUrl); // Set the first video as default
      } else {
        setError("No videos available. Please upload some.");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError(err.message || "Failed to load videos. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle video error
  const handleVideoError = () => {
    setError("Unable to load the selected video. Please try another one.");
    setSelectedVideo(null);
  };

  // Open video modal
  const handleVideoClick = (video) => {
    setSelectedVideo(video.fileUrl);
    setShowModal(true); // Show the video modal
  };

  // Close video modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="video-player-container">
      <h2 className="player-title">Video Player</h2>

      {/* Loading or error messages */}
      {loading && <p>Loading videos...</p>}
      {error && !loading && <p className="error-message">{error}</p>}

      {/* Video modal */}
      {showModal && (
        <div className="video-modal" onClick={closeModal}>
          <div className="modal-content">
            <video
              controls
              width="640"
              height="360"
              src={selectedVideo}
              onError={handleVideoError}
            >
              Your browser does not support the video tag.
            </video>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Video list (cards) */}
      <div className="video-list">
        <h3>Available Videos</h3>
        <div className="video-cards">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => handleVideoClick(video)}
            >
               <div className="video-thumbnail">
                <img
                  src={video.thumbnail || "https://via.placeholder.com/640x360"} // Fallback thumbnail
                  alt={video.title}
                />
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retry button */}
      {error && (
        <div className="retry-section">
          <button onClick={fetchVideos} className="retry-button">
            Retry Fetching Videos
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
