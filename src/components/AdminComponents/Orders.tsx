import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import EventBus from "../../common/EventBus";
import { getBoard } from "../../services/admin.service";
import SidebarView from "../SideBarView";


const AdminOrders: React.FC = () => {
    const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  useEffect(() => {
    getBoard("orders").then(
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
  const image = (imag: any) =>{
    return(
        <>
        <img
              src={imag.image}
              width={50}
              height={50}
              alt='Player'
            />
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
      name: "Date",
      selector: (row: { date: any }) => row.date,
      sortable: true,
    },
    {
      name: "Price $",
      
      selector: (row: { price: any }) => row.price,
      
    },
   
    {
        name: "ProductName",
        selector: (row: { productName: any }) => row.productName,
    },
    {
        name: "CustomerName",
        selector: (row: { customerName: any }) => row.customerName,
    },   
    {
      name: "EmployeeName",
      selector: (row: { employeeName: any }) => row.employeeName,
    },    
    
  ];
  


    return (
        
      
              
                 
                      <DataTable
                        pagination
                        columns={columns}
                        data={rows}
                      />
                   
             
    )
}
export default AdminOrders