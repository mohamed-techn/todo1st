import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function EditTaskDialog({ open, task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    priority: "None",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        priority: task.priority || "None",
        dueDate: task.dueDate || "",
        category: task.category || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(task.id, form);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Edit Task</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            name="title"
            label="Task Title "
            value={form.title}
            onChange={handleChange}
            fullWidth
            autoFocus
          />

          <FormControl fullWidth>
            <InputLabel id="edit-priority-label">Priority</InputLabel>
            <Select
              labelId="edit-priority-label"
              name="priority"
              label="Priority"
              value={form.priority}
              onChange={handleChange}
            >
              <MenuItem value="None">No Priority </MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="dueDate"
            type="date"
            label="Task Date "
            value={form.dueDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", color: "#fff", bgcolor: "#ef4444" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disableElevation
          sx={{
            textTransform: "none",
            bgcolor: "#3b6cf6",
            "&:hover": { bgcolor: "#2f5adb" },
          }}
        >
          Save Updates
        </Button>
      </DialogActions>
    </Dialog>
  );
}
