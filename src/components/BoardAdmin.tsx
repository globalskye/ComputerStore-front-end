import React, { useState, useEffect, useCallback } from "react";
import { FiEdit3  } from "react-icons/fi";
import { AiFillDelete  } from "react-icons/ai";
import { getBoard } from "../services/admin.service";
import { Routes, Route, Link } from "react-router-dom";
import EventBus from "../common/EventBus";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  MenuItemStyles,
} from "react-pro-sidebar";

import styled from "styled-components";
import DataTable from "react-data-table-component";

import {
  DataGrid,
  GridColDef,
  GridRowCount,
  GridValueGetterParams,
  GridApi,
} from "@mui/x-data-grid";
import { ICustomer } from "../types/customTypes";
import { Autocomplete, Box, Button, Modal, Typography } from "@mui/material";
import {  Container } from "react-bootstrap";
import SidebarView from "./SideBarView";
import AdminUsers from "./AdminComponents/Users";
import AdminEmployee from "./AdminComponents/Employee";
import AdminProducts from "./AdminComponents/Products";



const BoardAdmin: React.FC = () => {
 
  return (
   <></>
  );
};

export default BoardAdmin;
