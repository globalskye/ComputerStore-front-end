import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import EventBus from "../../common/EventBus";
import { getBoard } from "../../services/admin.service";
import SidebarView from "../SideBarView";


const AdminProducts: React.FC = () => {
    const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  useEffect(() => {
    getBoard("product").then(
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
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      
      selector: (row: { image: any }) => row.image,
      cell: (row: any) => image(row)
      
    },
    {   
        name: "Description",
        selector: (row: { description: any }) => row.description,
    },
    {
        name: "Price $",
        selector: (row: { price: any }) => row.price,
        sortable:true,
    },  
    {
        name: "Garantia(mounth)",
        selector: (row: { garantia: any }) => row.garantia,
    },
    {
        name: "Category",
        selector: (row: { category: any }) => row.category,
    },    
    
  ];


    return (
        
            <>
            <div className="row" >
            <SidebarView></SidebarView>
              
              
                  <div className="col"style={{margin:"2%", backgroundColor:"grey"}}>
                  
                  
                    <Container style={{marginTop:"2%"}}>
                      <DataTable
                        columns={columns}
                        data={rows}
                        
                        pagination
                        
                      />
                    </Container>
                  
                </div>
              </div>
              </>
    )
}
export default AdminProducts
