import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Controller, useForm } from 'react-hook-form';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import EventBus from '../common/EventBus';
import { getAllCategories, getAllProviders } from '../services';
import { addProductItem } from '../services/admin-product';
import { deleteProductById, getBoard } from '../services/admin.service';
import { Category, Provider } from '../types';

interface ProductFormValues {
  name: string;
  image: string;
  count: string;
  description: string;
  price: number;
  garantia: number;
  categoryId: number;
  providerId: number;
}

const ItemEditor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormValues>();

  const [providers, setProvider] = useState<Provider[]>();

  useEffect(() => {
    getAllProviders().then(
      (response) => {
        setProvider(response.data);
      },
      (error) => {
        setProvider([]);
      }
    );
  }, []);

  const [categories, setCategory] = useState<Category[]>();

  useEffect(() => {
    getAllCategories().then(
      (response) => {
        setCategory(response.data);
      },
      (error) => {
        console.log(error);

        setCategory([]);
      }
    );
  }, []);

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
    addProductItem({
      name: data.name,
      image: data.image,
      count: Number(data.count),
      description: data.description,
      price: Number(data.price),
      garantia: Number(data.garantia),
      categoryId: Number(data.categoryId),
      providerId: Number(data.providerId)
    }).then((res) => console.log(res));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name && 'Name is required'}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="image"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Image"
                variant="outlined"
                error={!!errors.image}
                helperText={errors.image && 'Image is required'}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Description"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description && 'Description is required'}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="count"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Count"
                variant="outlined"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  min: 0
                }}
                error={!!errors.count}
                helperText={errors.count && 'Count is required'}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="price"
            control={control}
            defaultValue={0}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Price"
                variant="outlined"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  min: 0
                }}
                error={!!errors.price}
                helperText={errors.price && 'Price is required'}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="garantia"
            control={control}
            defaultValue={0}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Garantia"
                variant="outlined"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  min: 0
                }}
                error={!!errors.garantia}
                helperText={errors.garantia && 'Garantia is required'}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="categoryId"
            control={control}
            defaultValue={0}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category">
                  {categories?.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="providerId"
            control={control}
            defaultValue={0}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Provider</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Provider">
                  {providers?.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.provider}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button type="submit">Submit</Button>
      </Grid>
    </form>
  );
};

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
    width: 600,
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
          <ItemEditor />
        </Box>
      </Modal>
      <DataTable pagination columns={columns} data={rows} />
    </div>
  );
};
export default AdminProducts;
