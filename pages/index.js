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
  console.log("filteredusers", filteredusers);
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
        <Grid container spacing={5}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
        <h1 style={{ margin: "30px 10px" }}>Result</h1>

        {isError !== "" && <h2> {isError}</h2>}
        <div>
          {filteredusers?.map((item, key) => (
            <StyledDiv key={key}>
              <StyledTypography>Index is {key + 1}</StyledTypography>
              <StyledTypography>ID is {item.id}</StyledTypography>
              <div>
                <img src={item.avatar_url}></img>
              </div>
              <StyledTypography>Name is {item.login}</StyledTypography>
            </StyledDiv>
          ))}
        </div>
      </Container>
    </>
  );
}

export default index;
