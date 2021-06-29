import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/DoneOutline";
import DownIcon from "@material-ui/icons/DesktopAccessDisabled";
import DeleteIcon from "@material-ui/icons/Delete";

import Spinner from "../../Spinner/Spinner";

function Strip(props) {
  const [deleting, setDeleting] = useState(false);

  const deleteHandler = () => {
    setDeleting(true);
    fetch(`${process.env.REACT_APP_SERVER}/dashboard/remove`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: props.uid,
        url: props.url,
      }),
    })
      .then(async (res) => {
        setDeleting(false);
        const data = await res.json();
        if (!data.status) {
          return;
        }
        props.onDelete();
      })
      .catch(() => {
        setDeleting(false);
      });
  };

  return (
    <Grid
      container
      spacing={1}
      style={{ width: "100%", margin: "0" }}
      className="dashboard_strip"
      alignItems="center"
    >
      <Grid item xs={2} sm={2} md={2} lg={1}>
        <div
          style={{
            padding: "15px",
            margin: "2px auto",
            borderRadius: "50%",
            backgroundColor: `${props.down ? "red" : "var(--secondary-color)"}`,
            width: "fit-content",
            color: "#fff",
          }}
          className="icon_container"
        >
          {props.down ? <DownIcon /> : <DoneIcon />}
        </div>
      </Grid>
      <Grid
        style={{ borderLeft: "1px solid #000" }}
        item
        xs={5}
        sm={5}
        md={4}
        lg={4}
      >
        <p>
          <a
            href={props.url}
            target="_blank"
            rel="noreferrer noopener"
            style={{ color: props.down ? "red" : "var(--secondary-color)" }}
          >
            {props.name ? props.name.substr(0, 22) : ""}
          </a>
        </p>
      </Grid>
      <Grid
        style={{ borderLeft: "1px solid #000" }}
        item
        xs={2}
        sm={2}
        md={1}
        lg={1}
      >
        <p>{props.statusCode}</p>
      </Grid>
      <Grid
        style={{ borderLeft: "1px solid #000" }}
        item
        xs={2}
        sm={2}
        md={1}
        lg={1}
      >
        <p>{props.responseTime}</p>
      </Grid>
      <Grid
        style={{ borderLeft: "1px solid #000" }}
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
      >
        {deleting ? (
          <Spinner small />
        ) : (
          <DeleteIcon
            onClick={deleteHandler}
            style={{ color: "red", cursor: "pointer" }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Strip;
