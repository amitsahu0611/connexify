const StatusBadge = ({ status, type = "lead" }) => {
  // Define color schemes for different status types
  const leadColors = {
    New: "bg-green-100 text-green-800",
    Contacted: "bg-blue-100 text-blue-800",
    Qualified: "bg-purple-100 text-purple-800",
    Negotiation: "bg-yellow-100 text-yellow-800",
    "Closed Won": "bg-emerald-100 text-emerald-800",
    "Closed Lost": "bg-red-100 text-red-800",
    Lost: "bg-red-100 text-red-800",
  }

  const clientColors = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  }

  const taskColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
  }

  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  }

  // Select the appropriate color scheme based on type
  let colorScheme
  switch (type) {
    case "lead":
      colorScheme = leadColors
      break
    case "client":
      colorScheme = clientColors
      break
    case "task":
      colorScheme = taskColors
      break
    case "priority":
      colorScheme = priorityColors
      break
    default:
      colorScheme = leadColors
  }

  // Get the color class for the status, or use a default
  const colorClass = colorScheme[status] || "bg-gray-100 text-gray-800"

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>{status}</span>
  )
}

export default StatusBadge
