import React, { useState, useEffect, useCallback } from "react";

import { getBoard } from "../services/admin.service";
import EventBus from "../common/EventBus";
import { Menu, MenuItem, Sidebar, SubMenu, MenuItemStyles } from "react-pro-sidebar";
import styled from "styled-components";
import DataTable from 'react-data-table-component';

import {
  DataGrid,
  GridColDef,
  GridRowCount,
  GridValueGetterParams,
  GridApi,
} from "@mui/x-data-grid";
import { ICustomer } from "../types/customTypes";
import { Autocomplete, Box, Button, Modal, Typography } from "@mui/material";
import { Container } from "react-bootstrap";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BoardAdmin: React.FC = () => {
 
 
  const [ids, setIds] = useState<any[]>();
  const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  const [column, setColumn] = useState<GridColDef[]>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [board, setBoard] = useState<string>("");

  const testFunc = (board: string) => {
    getBoard(board).then(
      (response) => {
        setRows(getRows(response.data));
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };

  const getRows = (a: any[]): any[] => {
    let v: any[] = [];
    let support = {
      id: null,
    };

    for (let i = 0; i < a.length; i++) {
      let obj: any = {};
      obj = Object.assign(obj, support, a[i]);
      v[i] = obj;
    }
    return v;
  };

  const getCols = (): GridColDef[] => {
    let columnn: GridColDef[] = [];
    if (rows) {
      for (let key in rows[0]) {
        if (key) {
          // push the value to the result array only if key exists

          columnn.push({ field: key, headerName: key, width: 150 });
        }
      }
    }

    return columnn;
  };

  // if (rows) {
  //   return (
  //     <><div style={{ display: 'flex', height: '100%' }}>
  //     <Sidebar>
  //       <Menu>
  //         <MenuItem> Documentation</MenuItem>
  //         <MenuItem> Calendar</MenuItem>
  //         <MenuItem> E-commerce</MenuItem>
  //       </Menu>
  //     </Sidebar>
     
  //   </div>
      
       
  //       <main>
  //       <form>
  //         <button
  //           type="button"
  //           className="btn btn-primary"
  //           onClick={() => {
  //             testFunc("customer");
  //           }}
  //         >
  //           Customer
  //         </button>
  //       </form>
  //       <form>
  //         <button
  //           type="button"
  //           className="btn btn-primary"
  //           onClick={() => {
  //             testFunc("employee");
  //           }}
  //         >
  //           Employee
  //         </button>
  //       </form>
  //       <form>
  //         <button
  //           type="button"
  //           className="btn btn-primary"
  //           onClick={() => {
  //             testFunc("product");
  //           }}
  //         >
  //           Product
  //         </button>
  //       </form>
  //         <div style={{ height: 400, width: "100%" }}>
  //           <DataGrid
  //             rows={rows}
  //             columns={getCols()}
  //             autoPageSize={true}
  //             rowsPerPageOptions={[rows.length]}
  //             checkboxSelection
  //             onSelectionModelChange={(itm) => setIds(itm)}
  //           />
  //           <button
  //             type="button"
  //             className="btn btn-primary"
  //             onClick={handleOpen}
  //           >
  //             Добавить
  //           </button>
  //           <Modal
  //             open={open}
  //             onClose={handleClose}
  //             aria-labelledby="modal-modal-title"
  //             aria-describedby="modal-modal-description"
  //           >
  //             <Box sx={style}>
  //               <Typography id="modal-modal-title" variant="h6" component="h2">
  //                 Text in a modal
  //               </Typography>
  //               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
  //                 Duis mollis, est non commodo luctus, nisi erat porttitor
  //                 ligula.
  //               </Typography>
  //             </Box>
  //           </Modal>
  //           <button type="button" className="btn btn-primary">
  //             Редактировать
  //           </button>
  //           <button type="button" className="btn btn-primary">
  //             Удалить
  //           </button>
  //         </div>
  //         </main>
  //     </>
  //   );
  // }
  const Menuitem = styled(MenuItem)`
  :hover {
    background-color: #ffdb58;
    padding: 5px;
    border-radius: 10px;
  }
`;
const columns = [
  {
      name: 'Title',
      selector: (row: { title: any; }) => row.title,
      sortable: true,
  },
  {
      name: 'Year',
      selector: (row: { year: any; }) => row.year,
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
]
//https://react-data-table-component.netlify.app/?path=/docs/pagination-basic--basic
  return( 

  
  <div className="row">
  <div className="col" >
    
 
  <div style={{ display: 'flex', height: '100%', backgroundColor: '#D8D8D8' }}>
      <Sidebar
      style={{height:"145vh"}}
      backgroundColor="grey">
        <Menu >
         <MenuItem style={{color:'black'}}> Documentation</MenuItem>
         <Menuitem > Calendar</Menuitem>
         
         <SubMenu title="Components" >
     
    </SubMenu>
        </Menu>
        
      </Sidebar>
  
    
      <div className="col">
        <Container>
        <DataTable
            columns={columns}
            data={data}
            selectableRows
            pagination
            onSelectedRowsChange={(itm) =>console.log(itm)}
        />
        </Container>
     
</div>
  
  </div>
</div>
</div>



);
};

export default BoardAdmin;
