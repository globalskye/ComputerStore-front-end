import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import EventBus from '../common/EventBus';
import { deleteProductById, getBoard } from '../services/admin.service';

const AdminProducts: React.FC = () => {
  const [rows, setRows] = useState<any[]>([{ id: 1 }]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  useEffect(() => {
    getBoard('product').then(
      (response) => {
        console.log(response.data);
        setRows(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      }
    );
  }, []);
  const deleteProduct = (id: any) => {
    deleteProductById(id).then(
      (response) => {
        console.log(response.data);
        setRows((old) => old.filter((item) => item.id !== id));
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const but = (id: number) => {
    return (
      <>
        <button
          style={{ padding: '1px', borderRadius: '5px', margin: '4px' }}
          onClick={() => {
            deleteProduct(id);
          }}>
          <AiFillDelete />
        </button>
      </>
    );
  };
  const image = (imag: any) => {
    return (
      <>
        <img src={imag.image} width={50} height={50} alt="Player" />
      </>
    );
  };
  const columns = [
    {
      name: 'Actions',
      button: true,
      selector: (row: { id: any }) => row.id,
      cell: (row: any) => but(row.id)
    },
    {
      name: 'Name',
      selector: (row: { name: any }) => row.name,
      sortable: true
    },
    {
      name: 'Count',
      selector: (row: { count: any }) => row.count,
      sortable: true
    },
    {
      name: 'Image',

      selector: (row: { image: any }) => row.image,
      cell: (row: any) => image(row)
    },
    {
      name: 'Description',
      selector: (row: { description: any }) => row.description
    },
    {
      name: 'Price $',
      selector: (row: { price: any }) => row.price,
      sortable: true
    },
    {
      name: 'Garantia(mounth)',
      selector: (row: { garantia: any }) => row.garantia
    },
    {
      name: 'Category',
      selector: (row: { category: any }) => row.category
    }
  ];

  return (
    <div>
      <Button onClick={handleOpen}>Add item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <DataTable pagination columns={columns} data={rows} />
    </div>
  );
};
export default AdminProducts;
