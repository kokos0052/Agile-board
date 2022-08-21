import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useStore from "../../hooks/useStore";
import Column from "./Column";
import NewTaskDialog from "./NewTaskDialog";

function getListStyle(isDraggingOver) {
  return {
    backgroundColor: isDraggingOver ? "lightblue" : "lightgray",
    padding: 8,
    minHeight: 500,
  };
}

function Dashboard() {
  const { boards } = useStore();
  const [newTaskTo, setNewTask] = useState(null);

  const closeDialog = useCallback(() => {
    setNewTask(null)
  }, [setNewTask]);

  const onDragEnd = useCallback((e) => {
    const {source, destination, draggableId: taskId} = e;

    boards.active.moveTask(taskId, source, destination);
  }, [boards]);

  return (
    <Box style={{ padding: 20 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards.active?.sections?.map((section) => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    style={{
                      padding: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">{section?.title}</Typography>
                    <Button variant="outlined" color="primary" onClick={() => setNewTask(section.id)}>
                      Add
                    </Button>
                  </Box>
                  <Droppable droppableId={section.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Column section={section} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog open={!!newTaskTo} handleClose={closeDialog} activeSection={newTaskTo}/>
    </Box>
  );
}

export default observer(Dashboard);
