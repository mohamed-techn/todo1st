import { Box, Typography, Paper } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function Header({ date, closedOut, totalTasks }) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 1,
        py: 1,
        bgcolor: "transparent",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArticleOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            To Do's
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "#676c76",
              lineHeight: 1.5,
              mt: 0.25,
            }}
          >
            {date}
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: 13, color: "#0f172a",fontWeight: 700   }}>
        {closedOut} of {totalTasks}{" "}
        <Box component="span" sx={{ fontSize: 13,color: "#676c76", fontWeight: 500 ,lineHeight: 1.5}}>
          closed out
        </Box>
      </Typography>
    </Paper>
  );
}
