import { useState } from "react";
import axios from "../api/axios";

const ApplyButton = ({ jobId }) => {
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    try {
      await axios.post(`/applications/apply/${jobId}`);
      setApplied(true);
      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <button
      onClick={handleApply}
      className="bg-green-500 text-white px-4 py-2 mt-4"
      disabled={applied}
    >
      {applied ? "Already Applied" : "Apply Now"}
    </button>
  );
};

export default ApplyButton;
