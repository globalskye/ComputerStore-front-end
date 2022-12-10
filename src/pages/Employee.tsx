import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import EventBus from '../common/EventBus';
import { getBoard } from '../services/admin.service';
import { Order } from '../types';
import { Employee } from '../types/employee';

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

  const columns = [
    {
      name: 'FirstName',
      selector: (row: Employee) => row.firstname,
      sortable: true
    },
    {
      name: 'Lastname',
      selector: (row: Employee) => row.lastname
    },
    {
      name: 'Phone',
      selector: (row: Employee) => row.phone
    },
    {
      name: 'Salary $',
      selector: (row: Employee) => row.salary,
      sortable: true
    }
  ];

  return <DataTable pagination columns={columns} data={rows} />;
};
export default AdminEmployee;
