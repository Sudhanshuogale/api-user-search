import { Button, TextField, Typography } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";

const StyledTypography = styled(Typography)(() => ({
  margin: "10px",
  color: "blue",
}));

const StyledDiv = styled("div")(() => ({
  margin: "50px 0",
}));

const StyledDiv2 = styled("div")(() => ({
  size: "100px",
}));

function index() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  const [filteredusers, setFilteredusers] = useState([]);
  const [input, setInput] = useState("");

  async function fetchUserName() {
    try {
      const response = await axios.get("https://api.github.com/users");
      console.log("response", response);
      setMyData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  }

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleSearch = () => {
    if (input) {
      let filtered = myData?.filter((item) => {
        return item.login === input;
      });
      setFilteredusers(filtered);
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSearch}>
          <Grid container spacing={5}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Username"
                placeholder="User name"
                variant="outlined"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
        <h1 style={{ margin: "30px 10px" }}>Result</h1>

        {isError !== "" && <h2> {isError}</h2>}
        <div>
          {filteredusers?.map((item, key) => (
            <StyledDiv key={key}>
              <Container>
                <Grid container spacing={2}>
                  <Grid item>
                    <img
                      alt={item.avatar_url}
                      src={item.avatar_url}
                      width="100px"
                      style={{ border: "1px", borderRadius: "50px" }}
                    />
                  </Grid>
                  <Grid item>
                    <StyledTypography>Name is {item.login}</StyledTypography>
                    <StyledTypography>
                      <a href="item.avatar_url">URL</a>
                    </StyledTypography>
                  </Grid>
                </Grid>
              </Container>
            </StyledDiv>
          ))}
        </div>
      </Container>
    </>
  );
}

export default index;
