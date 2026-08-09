import "./App.css";
import Dashboard from "./components/layout/Dashboard";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/Theme";
import TaskProvider from "./context/TaskContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <TaskProvider>
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
        >
          <Dashboard />
        </Box>
      </TaskProvider>
    </ThemeProvider>
  );
}
export default App;