import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import useStore from "../../hooks/useStore";

function NewTaskDialog({ open, handleClose, activeSection }) {
  const { users, boards } = useStore();
  const [formState, setFormState] = useState("");

  const updateFormState = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value ? value : "",
      }));
    },
    [setFormState]
  );

  const addNewTask = useCallback((e) => {
    e.preventDefault();

    boards.active.addTask(activeSection, formState);
    handleClose();
  }, [formState, boards, activeSection, handleClose])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a new Task</DialogTitle>
      <form onSubmit={addNewTask}>
        <DialogContent style={{ minWidth: 500 }}>
          <Box style={{ padding: 10 }}>
            <TextField
              fullWidth
              required
              type="text"
              name="title"
              label="Title"
              onChange={updateFormState}
              value={formState?.title || ""}
            ></TextField>
          </Box>
          <Box style={{ padding: 10 }}>
            <TextField
              fullWidth
              required
              type="text"
              name="description"
              label="Description"
              onChange={updateFormState}
              value={formState?.description || ""}
            ></TextField>
          </Box>
          <Box style={{ padding: 10 }}>
            <FormControl fullWidth>
              <FormLabel shrink>Assignee</FormLabel>
              <Select
                style={{
                  backgroundColor: "#fff",
                  marginLeft: 10,
                }}
                name="assignee"
                value={formState?.assignee || ""}
                onChange={updateFormState}
              >
                <MenuItem value="" disabled>
                  -
                </MenuItem>
                {users.list.map((u) => {
                  return (
                    <MenuItem key={u.id} value={u?.id}>
                      {u?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default observer(NewTaskDialog);
