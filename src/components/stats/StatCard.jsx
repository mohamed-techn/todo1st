import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { getTodayForInput } from "../tasks/dateHelpers";

import Header from "../layout/Header";

export default function StatCard() {
  const { task } = useContext(TaskContext);
  const today = getTodayForInput();
  const totalTasks = task.length;

  const TodayCount = task.filter(
    (t) => !t.isCompleted && t.dueDate === today,
  ).length;

  //{&& t.dueDate &&} ==> To make sure that date is exist not (null or "" or undefined) before checking the data is under or over today
  const overCount = task.filter(
    (t) => !t.isCompleted && t.dueDate && t.dueDate < today,
  ).length;

  const completedCount = task.filter((t) => t.isCompleted).length;
  const completedPercentage =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  const stats = [
    { value: totalTasks, label: "Total tasks", color: "#0f172a" },
    { value: TodayCount, label: "Due today", color: "#007EDE" },
    { value: overCount, label: "Overdue", color: "#ef4444" },
    { value: `${completedPercentage}%`, label: "Completed", color: "#17C077" },
  ];
  const taskDate = new Date();
  const todayString = `${taskDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })}`;

  return (
    <>
      <Header
        closedOut={completedCount}
        totalTasks={totalTasks}
        date={todayString}
      />
      <Box sx={{ flexGrow: 1, mt: 1.7 }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {stats.map((stat) => (
            // Mobile: 2 cards per row (size 6 of 12)
            // Small tablets and up: 4 cards per row (size 3 of 12)
            <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 1.8 },
                  borderRadius: 4,
                  border: "1px solid #eef0f3",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 22, sm: 23 },
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 10, sm: 12 },
                    color: "#8a93a3",
                    mt: 0.5,
                    lineHeight: "1.2 ",
                  }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
