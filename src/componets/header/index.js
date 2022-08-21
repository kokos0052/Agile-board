import {
  AppBar,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import User from "../common/User";

function Header() {
  const { users, boards } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Dashboard</Typography>
              <FormControl>
                <Select
                  style={{
                    backgroundColor: "#fff",
                    marginLeft: 10,
                  }}
                  value={boards?.active?.id || ""}
                  onChange={(e) => {
                    const {value} = e.target;

                    boards.selectBoard(value);
                  }}
                >
                  <MenuItem value="" disabled>
                    -
                  </MenuItem>
                  {boards.list.map((b) => {
                    return (
                      <MenuItem key={b.id} value={b?.id}>
                        {b?.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <User user={users?.me} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default observer(Header);
