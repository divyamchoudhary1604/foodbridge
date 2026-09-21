function StatusBadge({ status }) {

  let className = "status-badge";

  if (status === "Available") {
    className += " status-available";
  } 
  else if (status === "Accepted") {
    className += " status-accepted";
  } 
  else if (status === "Completed") {
    className += " status-completed";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}

export default StatusBadge;