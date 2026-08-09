import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";

export default function FilterTabs({
  filter,
  onFilterChange,
  totalTasks,
  activeTasks,
  completedTasks,
}) {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) onFilterChange(newFilter);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={filter}
      exclusive
      onChange={handleChange}
      aria-label="Task filter"
      sx={{
        width: { xs: "100%", sm: "auto" },
        mb: 1,
        bgcolor: "transparent",
        gap: "10px",

        "& .MuiToggleButton-root": {
          flex: { xs: 1, sm: "initial" },
          fontSize: { xs: 13, sm: 13 },
          textTransform: "none",
          px: { xs: 1.5, sm: 2.2 },
          py: 1,
          border: "none",
          borderRadius: "10px !important",
          color: "text.secondary",
          fontWeight: 500,
          transition: "all 0.15s ease",

          "&:hover": {
            bgcolor: "rgba(0,0,0,0.03)",
          },

          "&.Mui-selected": {
            bgcolor: "#ffffff",
            color: "#111827",
            fontWeight: 600,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "#ffffff" },
          },
        },
      }}
    >
      <ToggleButton value="all" aria-label="All tasks">
        All
        <Box
          component="span"
          sx={{
            ml: 0.75,
            px: 0.9,
            py: 0.05,
            borderRadius: "999px",
            fontSize: 11,
            fontWeight: 700,
            bgcolor: "#eef0f2",
            color: filter === "all" ? "#111827" : "text.secondary",
          }}
        >
          {totalTasks}
        </Box>
      </ToggleButton>

      <ToggleButton value="active" aria-label="Active tasks">
        Open
        <Box
          component="span"
          sx={{
            ml: 0.75,
            px: 0.9,
            py: 0.05,
            borderRadius: "999px",
            fontSize: 12,
            fontWeight: 700,
            bgcolor: "#eef0f2",
            color: filter === "active" ? "#111827" : "text.secondary",
          }}
        >
          {activeTasks}
        </Box>
      </ToggleButton>

      <ToggleButton value="completed" aria-label="Completed tasks">
        Done
        <Box
          component="span"
          sx={{
            ml: 0.75,
            px: 0.9,
            py: 0.05,
            borderRadius: "999px",
            fontSize: 12,
            fontWeight: 700,
            bgcolor: "#eef0f2",
            color: filter === "completed" ? "#111827" : "text.secondary",
          }}
        >
          {completedTasks}
        </Box>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
