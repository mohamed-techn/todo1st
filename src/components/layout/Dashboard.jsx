import { Container } from "@mui/material";
import StatCard from "../stats/StatCard";
import TaskList from "../tasks/TaskList";
import AddTaskForm from "../tasks/AddTaskForm";
export default function Dashboard() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 2,
      }}
    >
      <StatCard />
      <TaskList />
      <AddTaskForm />
    </Container>
  );
}
