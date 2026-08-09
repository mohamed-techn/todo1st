import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function SortDropdown({
  sortOrder = "newest",
  onSortChange = () => {},
}) {
  return (
    <Select
      value={sortOrder}
      onChange={(e) => onSortChange(e.target.value)}
      sx={{
        minWidth: { xs: "100%", sm: 160 },
        borderRadius: 3,
        fontSize: 12,
        bgcolor: "#fff",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e5e7eb",
        },
        "& .MuiSelect-select": {
          py:  { xs: 2, sm: 1 },
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <MenuItem value="newest" sx={{ fontSize: 12 }}>
        Newest first
      </MenuItem>
      <MenuItem value="oldest" sx={{ fontSize: 12 }}>
        Oldest first
      </MenuItem>
      <MenuItem value="priority" sx={{ fontSize: 12 }}>
        Highest Priority
      </MenuItem>
    </Select>
  );
}
