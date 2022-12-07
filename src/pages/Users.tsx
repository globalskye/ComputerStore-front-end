import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import EventBus from '../common/EventBus';
import { deleteUserById, getBoard } from '../services/admin.service';

const AdminUsers: React.FC = () => {
  const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  const [test, setTest] = useState<number>(1);
  useEffect(() => {
    getBoard('users').then(
      (response) => {
        setRows(response.data);
        console.log(test);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setRows(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      }
    );
  }, []);
  const but = (id: number) => {
    return (
      <>
        <button
          style={{ padding: '1px', borderRadius: '5px', margin: '4px' }}
          onClick={() => {
            deleteUser(id);
          }}>
          <AiFillDelete />
        </button>
      </>
    );
  };
  const deleteUser = (id: number) => {
    console.log(id);
    deleteUserById(id).then(
      (response) => {
        console.log(response);
        setRows((old) => old.filter((item) => item.id !== id));
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
  };
  const columns = [
    {
      name: 'Actions',
      button: true,
      selector: (row: { id: any }) => row.id,
      cell: (row: any) => but(row.id)
    },
    {
      name: 'Username',
      selector: (row: { username: any }) => row.username,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row: { email: any }) => row.email
    },
    {
      name: 'Adress',
      selector: (row: { adress: any }) => row.adress
    },
    {
      name: 'Role',
      selector: (row: { role: any }) => row.role
    }
  ];

  return <DataTable pagination columns={columns} data={rows} />;
};
export default AdminUsers;
