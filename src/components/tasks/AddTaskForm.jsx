import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import DeleteConfirmDialog from "./DeleteConfirmDialog";

import { TaskContext } from "../../context/TaskContext";

export default function AddTaskForm() {
  const { input, handleChange, handleAddTask, handleClearCompleted } =
    useContext(TaskContext);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleAdd = () => {
    if (!input.title.trim()) return;
    handleAddTask();
  };

  // Enter اضافة التاسك عند الضغط علي
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  function confirmClear() {
    handleClearCompleted();
    setConfirmClearOpen(false);
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        border: "1px solid #eef0f3",
      }}
    >
      {/* =========================
          Title + Add Button
      ========================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
        }}
      >
        {/* Task title */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            px: 2,
            py: 0.7,
            borderRadius: 2,
            border: "1px solid #e5e7eb",

            "&:focus-within": {
              borderColor: "#3b6cf6",
            },
          }}
        >
          <InputBase
            name="title"
            placeholder="Add a task..."
            value={input.title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            fullWidth
            sx={{
              fontSize: 12,

              "& input::placeholder": {
                color: "#9ca3af",
                opacity: 1,
              },
            }}
          />
        </Paper>

        {/* Add button */}
        <Button
          onClick={handleAdd}
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#3b6cf6",
            borderRadius: 2,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            px: 2.5,
            py: 1,

            width: {
              xs: "100%",
              sm: "auto",
            },

            "&:hover": {
              bgcolor: "#2f5adb",
            },
          }}
        >
          Add task
        </Button>
      </Box>

      {/* =========================
          Priority / Date / Category
      ========================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 1.5,
          mt: 1.2,
        }}
      >
        {/* =========================
            Priority
        ========================= */}
        <Select
          name="priority"
          value={input.priority}
          onChange={handleChange}
          fullWidth
          displayEmpty
          sx={{
            flex: 1,
            borderRadius: 2,
            fontSize: 12,
            bgcolor: "#fff",
            color: input.priority === "None" ? "#9ca3af" : "#374151",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e5e7eb",
            },

            "& .MuiSelect-select": {
              py: 1.2,
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d1d5db",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b6cf6",
            },
          }}
        >
          <MenuItem
            value="None"
            sx={{
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            No priority
          </MenuItem>

          <MenuItem value="High" sx={{ fontSize: 12 }}>
            High
          </MenuItem>

          <MenuItem value="Medium" sx={{ fontSize: 12 }}>
            Medium
          </MenuItem>

          <MenuItem value="Low" sx={{ fontSize: 12 }}>
            Low
          </MenuItem>
        </Select>

        {/* =========================
            Due Date
        ========================= */}
        <TextField
          name="dueDate"
          type="date"
          value={input.dueDate}
          onChange={handleChange}
          fullWidth
          sx={{
            flex: 1,

            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              fontSize: 12,
              color: "#374151",

              "& fieldset": {
                borderColor: "#e5e7eb",
              },

              "&:hover fieldset": {
                borderColor: "#d1d5db",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#3b6cf6",
              },
            },

            "& input": {
              py: 1.5,
            },

            // Calendar icon
            "& input::-webkit-calendar-picker-indicator": {
              opacity: 0.6,
              cursor: "pointer",
            },
          }}
        />

        {/* =========================
            Category
        ========================= */}

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            px: 2,
            py: 0.7,
            borderRadius: 2,
            border: "1px solid #e5e7eb",

            "&:focus-within": {
              borderColor: "#3b6cf6",
            },
          }}
        >
          <InputBase
            name="category"
            placeholder="Category (optional)"
            value={input.category}
            onChange={handleChange}
            fullWidth
            sx={{
              fontSize: 12,

              "& input": {
                py: 0.5,
              },

              "& input::placeholder": {
                color: "#9ca3af",
                opacity: 1,
              },
            }}
          />
        </Paper>
      </Box>

      {/* =========================
          Footer
      ========================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "#9ca3af",
          }}
        >
          Saved privately to your account
        </Typography>

        <Link
          component="button"
          onClick={() => setConfirmClearOpen(true)}
          underline="hover"
          sx={{
            fontSize: 12,
            color: "#535963",
            fontWeight: 700,
          }}
        >
          Clear completed
        </Link>
        <DeleteConfirmDialog
          open={confirmClearOpen}
          onClose={() => setConfirmClearOpen(false)}
          onConfirm={confirmClear}
          title="Clear all completed tasks?"
          description="This will permanently remove every task marked as done. This action is irreversible."
        />
      </Box>
    </Paper>
  );
}
