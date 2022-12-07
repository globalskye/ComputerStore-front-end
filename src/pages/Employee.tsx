import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import EventBus from '../common/EventBus';
import { getBoard } from '../services/admin.service';

const AdminEmployee: React.FC = () => {
  const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  useEffect(() => {
    getBoard('employee').then(
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

  const but = () => {
    return (
      <>
        <button style={{ padding: '1px', borderRadius: '5px', margin: '4px' }}>
          <FiEdit3 />
        </button>
        <button style={{ padding: '1px', borderRadius: '5px', margin: '4px' }}>
          <AiFillDelete />
        </button>
      </>
    );
  };
  const columns = [
    {
      name: 'Actions',
      button: true,
      selector: (row: { id: any }) => row.id,
      cell: (row: any) => but()
    },
    {
      name: 'FirstName',
      selector: (row: { firstname: any }) => row.firstname,
      sortable: true
    },
    {
      name: 'Lastname',
      selector: (row: { lastname: any }) => row.lastname
    },
    {
      name: 'Phone',
      selector: (row: { phone: any }) => row.phone
    },
    {
      name: 'WorkTime',
      selector: (row: { worktime: any }) => row.worktime
    },
    {
      name: 'Salary $',
      selector: (row: { salary: any }) => row.salary
    }
  ];

  return <DataTable pagination columns={columns} data={rows} />;
};
export default AdminEmployee;
