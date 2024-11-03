import React from 'react';
import { Share } from 'lucide-react';

export default function MeetingSelector() {
  const handleScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always"
        },
        audio: true
      });
      
      // Here you would handle the stream (e.g., connect to WebRTC)
      const videoElement = document.createElement('video');
      videoElement.srcObject = mediaStream;
      videoElement.className = 'w-full h-full object-cover';
      
      const container = document.getElementById('meeting-container');
      if (container) {
        container.innerHTML = '';
        container.appendChild(videoElement);
        videoElement.play();
      }
    } catch (err) {
      console.error('Error accessing screen share:', err);
    }
  };

  return (
    <div id="meeting-container" className="bg-black rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] text-white">
      <h2 className="text-lg mb-4">Select your interview meeting room</h2>
      <button 
        onClick={handleScreenShare}
        className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center space-x-2 hover:bg-orange-600 transition-colors"
      >
        <Share className="w-4 h-4" />
        <span>Select</span>
      </button>
    </div>
  );
}