import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { formatDueDate } from "./dateHelpers";

export default function TaskCard({
  task,
  onToggle = () => {},
  onDelete = () => {},
  onEdit = () => {},
}) {
  const {
    id,
    title = "Untitled task",
    priority,
    dueDate,
    category,
    isCompleted = false,
  } = task;

  const due = dueDate ? formatDueDate(dueDate) : null;

  return (
    <Card
      sx={{
        p: 0.25,
        borderRadius: 3,
        marginBottom: .7,
        // minHeight: { xs: 85, sm: 84 },
        height: { xs: "auto", sm: 84 },
        minHeight: { xs : 85 ,sm:78},
        transition: "all 0.2s ease",
        boxShadow: 1,
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          py: 1,
          "&:last-child": { pb: 1 },
        }}
      >
        <Grid
          container
          spacing={1.5}
          alignItems="center"
          wrap="nowrap"
          sx={{ justifyContent: "space-between", width: "100%" }}
        >
          {/* TEXT + CHECKBOX */}
          <Grid
            item
            xs
            zeroMinWidth
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              minWidth: 0,
            }}
          >
            <Checkbox
              checked={isCompleted}
              onChange={() => onToggle(id)}
              disableRipple
              icon={<RadioButtonUncheckedRoundedIcon sx={{ fontSize: 24 }} />}
              checkedIcon={<CheckCircleRoundedIcon sx={{ fontSize: 24 }} />}
              sx={{
                flexShrink: 0,
                p: 0.5,
                mt: "4px",
                color: "#cbd5e1",
                "&.Mui-checked": {
                  color: "#10b981", 
                },
              }}
              inputProps={{ "aria-label": "Mark task as done" }}
            />

            <Box sx={{ minWidth: 0, width: "100%" }}>
              {/* Title + priority */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  marginBottom: 0.25,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 15 },
                    fontWeight: 700,
                    lineHeight: 1.3,
                    overflow: { xs: "visible", sm: "hidden" },
                    textOverflow: { xs: "clip", sm: "ellipsis" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    display: { xs: "-webkit-box", sm: "block" },
                    WebkitLineClamp: { xs: 2, sm: "unset" },
                    WebkitBoxOrient: { xs: "vertical", sm: "unset" },
                    maxWidth: { xs: "100%", sm: 260 },
                    textDecoration: isCompleted ? "line-through" : "none",
                    color: isCompleted ? "text.disabled" : "text.primary",
                  }}
                >
                  {title}
                </Typography>

                {priority && (
                  <Typography
                    sx={{
                      bgcolor:
                        priority === "High"
                          ? "#fee2e2"
                          : priority === "Medium"
                            ? "#fef3c7"
                            : priority === "Low"
                              ? "#dbeafe"
                              : "#e5e7eb",
                      color:
                        priority === "High"
                          ? "#dc2626"
                          : priority === "Medium"
                            ? "#d97706"
                            : priority === "Low"
                              ? "#2563eb"
                              : "#4b5563",
                      px: 1,
                      py: 0.15,
                      borderRadius: 5,
                      lineHeight: 1.4,
                      fontSize: 11,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {priority}
                  </Typography>
                )}
              </Box>

              {/* Date + category */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: { xs: 1.5 },
                  minHeight: 16,
                }}
              >
                {due && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: due.isOverdue
                        ? "#dc2626"
                        : due.isUrgent
                          ? "#2563eb"
                          : "text.secondary",
                      fontWeight: due.isOverdue || due.isUrgent ? 600 : 400,
                    }}
                  >
                    {/* <CalendarMonthIcon sx={{ fontSize: 18, color: "#1976d2" }} /> */}
                    <Box
                      component="span"
                      sx={{
                        color: "white",
                      }}
                    >
                      📅
                    </Box>
                    {due.label}
                  </Typography>
                )}
                {category && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "text.secondary",
                    }}
                  >
                    {dueDate && (
                      <Box
                        component="span"
                        sx={{
                          color: "#bdbfc3",
                          marginRight: 0.5,
                          fontSize: 15,
                        }}
                      >
                        •
                      </Box>
                    )}
                    {category}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          {/* TEXT + CHECKBOX */}

          {/* BUTTONS */}
          <Grid
            item
            xs="auto"
            sx={{
              display: "flex",
              flexShrink: 0,
              alignItems: "center",
              gap: "11px",
            }}
          >
            {/* DELETE */}
            <IconButton
              onClick={() => onDelete(id)}
              sx={{
                bgcolor: "white",
                color: "#ef4444",
                boxShadow: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#ef4444",
                  color: "white",
                  transform: "scale(1.15) rotate(5deg)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            {/* EDIT */}
            <IconButton
              onClick={() => onEdit(id)}
              sx={{
                bgcolor: "white",
                color: "rgb(25, 118, 210)",
                boxShadow: 1,
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: "rgb(25, 118, 210)",
                  color: "white",
                  transform: "scale(1.15) rotate(-10deg)",
                },
              }}
            >
              <CreateRoundedIcon fontSize="small" />
            </IconButton>
          </Grid>
          {/* BUTTONS */}
        </Grid>
      </CardContent>
    </Card>
  );
}