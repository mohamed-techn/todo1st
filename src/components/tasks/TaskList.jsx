import { useContext, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { TaskContext } from "../../context/TaskContext";
import TaskCard from "./TaskCard";
import TaskSearchBar from "./TaskSearchBar";
import FilterTabs from "../FilterTabs/FilterTabs";

import DeleteConfirmDialog from "./DeleteConfirmDialog";
import EditTaskDialog from "./EditTaskDialog";

export default function TaskList() {
  const { task, handleEditTask, handleDeleteTask, handleCheckTask } =
    useContext(TaskContext);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Filter
  const filteredTasks = useMemo(() => {
    let result = task;
    if (filter === "active") result = result.filter((t) => !t.isCompleted);
    if (filter === "completed") result = result.filter((t) => t.isCompleted);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q),
      );
    }

    result = [...result];
    if (sortOrder !== "oldest") {
      result.reverse(); // newest first
    }

    if (sortOrder === "priority") {
      const priorityRank = { High: 0, Medium: 1, Low: 2, None: 3 };
      return [...result].sort((a, b) => {
        const rankA = priorityRank[a.priority?.toLowerCase()] ?? 3;
        const rankB = priorityRank[b.priority?.toLowerCase()] ?? 3;
        return rankA - rankB;
      });
    }

    return result;
  }, [task, filter, searchQuery, sortOrder]);
  // ## Filter ##

  // Filter Buttons
  const { totalTasks, activeTasks, completedTasks } = useMemo(() => {
    const total = task.length;
    const active = task.filter((t) => !t.isCompleted).length;
    return {
      totalTasks: total,
      activeTasks: active,
      completedTasks: total - active,
    };
  }, [task]);

  // ## Filter Buttons ##

  // Delete
  function askDelete(id) {
    setConfirmDeleteId(id);
  }

  function confirmDelete() {
    handleDeleteTask(confirmDeleteId);
    setConfirmDeleteId(null);
  }
  // ## Delete ##

  // Edit
  function askEdit(id) {
    const found = task.find((t) => t.id === id);
    if (found) setEditingTask(found);
  }
  // ## Edit ##

  // Check
  function askCheck(id) {
    handleCheckTask(id);
  }
  // ## Check ##

  return (
    <>
      <TaskSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <FilterTabs
        filter={filter}
        onFilterChange={setFilter}
        totalTasks={totalTasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
      />

      <Box
        sx={{
          p: { xs: 0.5, sm: "8px 10px 5px 5px" },
          maxHeight: { xs: "55vh", sm: "38vh" },
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {filteredTasks.length === 0 ? (
          <Typography
            sx={{
              fontSize: 14,
              color: "text.secondary",
              textAlign: "center",
              py: 3,
            }}
          >
            No tasks here.
          </Typography>
        ) : (
          filteredTasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onDelete={askDelete}
              onEdit={askEdit}
              onToggle={askCheck}
            />
          ))
        )}
      </Box>

      <DeleteConfirmDialog
        open={Boolean(confirmDeleteId)}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <EditTaskDialog
        open={Boolean(editingTask)}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleEditTask}
      />
    </>
  );
}
