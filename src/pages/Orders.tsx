import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import EventBus from '../common/EventBus';
import { getBoard } from '../services/admin.service';
import { Order } from '../types';

const AdminOrders: React.FC = () => {
  const [rows, setRows] = useState<any[]>([{ id: 1 }]);
  useEffect(() => {
    getBoard('orders').then(
      (response) => {
        setRows(response.data);
      },
      (error) => {
        console.log(error);

        setRows([]);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      }
    );
  }, []);

  const columns = [
    {
      name: 'Date',
      selector: (row: Order) => row.date,
      sortable: true
    },
    {
      name: 'Price $',
      selector: (row: Order) => row.price,
      sortable: true
    },
    {
      name: 'ProductName',
      selector: (row: Order) => row.productName
    },
    {
      name: 'Count',
      selector: (row: Order) => row.productCount
    },
    {
      name: 'UserName',
      selector: (row: Order) => row.userName
    },
    {
      name: 'EmployeeName',
      selector: (row: Order) => row.employeeName
    }
  ];

  return <DataTable pagination columns={columns} data={rows} />;
};
export default AdminOrders;
