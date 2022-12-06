import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import EventBus from "../../common/EventBus";
import { getBoard } from "../../services/admin.service";
import SidebarView from "../SideBarView";


const AdminUsers: React.FC = () => {
    const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  useEffect(() => {
    getBoard("users").then(
      (response) => {
        setRows(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRows(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  const but = () => {
    return (
      <>
      <button style={{padding:"1px", borderRadius:"5px", margin:"4px"}}><FiEdit3/></button>
      <button style={{padding:"1px", borderRadius:"5px",margin:"4px"}}><AiFillDelete/></button>
      </>
    )
  }
  const columns = [
    {
      name: "Actions",
      button: true,
      selector: (row: { id: any }) => row.id,
      cell: (row: any) => but()
    },
    {
      name: "Username",
      selector: (row: { username: any }) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
    },
    {
        name: "Adress",
        selector: (row: { adress: any }) => row.adress,
    },
    {
        name: "Role",
        selector: (row: { role: any }) => row.role,
    },  
  
  ];


    return (
        
           
              
              
                 
                      <DataTable
                      pagination
                        columns={columns}
                        data={rows}
                       
                        
                        onSelectedRowsChange={(itm) => console.log(itm)}
                      />
                 
    )
}
export default AdminUsers
