import { useState } from 'react';
import { FaCog, FaUserTie, FaColumns, FaThList, FaTable } from 'react-icons/fa';
import { GrTransaction, GrUserWorker } from 'react-icons/gr';
import { SiWheniwork } from 'react-icons/si';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

const SidebarView: React.FC = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar style={{ height: '145vh' }} defaultCollapsed={collapsed} backgroundColor={'grey'}>
      <Menu>
        <MenuItem icon={<FaThList />} onClick={() => setCollapsed(!collapsed)} />
      </Menu>

      <Menu>
        <MenuItem icon={<FaColumns />}> Dashboard</MenuItem>

        <SubMenu label="Tables" icon={<FaTable />}>
          <MenuItem icon={<FaUserTie />} onClick={() => navigate('/admin/users')}>
            Users
          </MenuItem>
          <MenuItem icon={<SiWheniwork />} onClick={() => navigate('/admin/product')}>
            Products
          </MenuItem>
          <MenuItem icon={<GrTransaction />} onClick={() => navigate('/admin/orders')}>
            Orders
          </MenuItem>
          <MenuItem icon={<GrUserWorker />} onClick={() => navigate('/admin/employee')}>
            Employee
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<FaCog />}>Settings</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarView;
