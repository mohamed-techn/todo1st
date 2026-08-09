import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import SortDropdown from "./SortDropdown";

export default function TaskSearchBar({
  searchQuery = "",
  onSearchChange = () => {},
  sortOrder = "newest",
  onSortChange = () => {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        my: 1.5,
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1, sm: 1.5 },
      }}
    >
      {/* Search input */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
        }}
      >
        <SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
        <InputBase
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
          sx={{
            fontSize: 12,
            "& input::placeholder": { color: "#9ca3af", opacity: 1 },
          }}
        />
      </Paper>

      {/* Sort dropdown */}
      <SortDropdown sortOrder={sortOrder} onSortChange={onSortChange} />
    </Box>
  );
}
