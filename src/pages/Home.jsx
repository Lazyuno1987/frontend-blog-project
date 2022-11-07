import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@mui/material";

export const Home = () => {
  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <Button href="/" style={{ marginRight: 15 }} variant="contained">
          Нові
        </Button>
        <Button href="/popular" variant="contained">
          Популярні
        </Button>
      </div>

      <Outlet />
    </>
  );
};
