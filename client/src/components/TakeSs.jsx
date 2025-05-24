import { Camera } from "lucide-react";
import { useState } from "react";

export default function TakeSs() {
  const [loading, setLoading] = useState(false);

  const handleScreenshot = async () => {
    const pageUrl = encodeURIComponent(window.location.href);
    const apiUrl = import.meta.env.VITE_SS_URL; // Renamed to avoid conflict
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/screenshot?url=${pageUrl}`);
      if (!response.ok) throw new Error("Failed to fetch screenshot");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob); // Renamed this variable

      const a = document.createElement("a");
      a.href = blobUrl; // Use the new variable name
      a.download = "screenshot.png";
      a.click();
      URL.revokeObjectURL(blobUrl); // Use the new variable name
    } catch (error) {
      console.error("Screenshot error:", error);
      alert("Failed to take screenshot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleScreenshot}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
      disabled={loading}
    >
      <Camera className="w-5 h-5" />
      {loading ? "Capturing..." : "Take Screenshot"}
    </button>
  );
}
