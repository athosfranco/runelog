import "./App.css";
import {
  Button,
  Card,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Stack } from "@mui/system";
import axios from "axios";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 18,
              },
            },
            defaultProps: {
              disableElevation: true,
              variant: "contained",
            },
          },
        },
      }),
    [isDarkMode]
  );

  const [playerSearch, setPlayerSearch] = useState("");

  const getPlayerStats = async (playerName: string) => {
    const endpoint = `http://localhost:3001/api/player/${playerName}`;

    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
      // do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ p: 10 }}>
        <div>
          <h1>RuneLog </h1>
          <Stack
            direction="row"
            justifyContent="center"
            gap={1}
            sx={{ width: "100%", my: 3 }}
          >
            <TextField
              size="small"
              onChange={(e) => setPlayerSearch(e.target.value)}
            ></TextField>
            <Button
              color="secondary"
              disabled={playerSearch.length === 0}
              onClick={() => getPlayerStats(playerSearch)}
            >
              Fetch
            </Button>
          </Stack>

          <Button color="primary" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? "Tema claro" : "Tema escuro"}
          </Button>
        </div>
        <Typography variant="body1" className="card">
          Template by{" "}
          <a href="https://github.com/athosfranco" target="_blank">
            Athos Franco
          </a>
        </Typography>
      </Card>
    </ThemeProvider>
  );
}

export default App;
