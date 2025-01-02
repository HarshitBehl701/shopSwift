import React, { useState } from "react";

function ExpandableDescription({description,limit}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <p   className="text-justify">
      {isExpanded || !(description.length > limit)
        ? description
        : `${description.slice(0, limit)}...`}
      {description.length > limit && (
        <button
          onClick={toggleDescription}
          className="ml-2 text-blue-500 text-xs hover:underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </p>
  );
}

export default ExpandableDescription;
