import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCog, FaUserTie, FaColumns, FaThList, FaTable,FaShoppingCart,  } from "react-icons/fa";
import { GrTransaction  } from "react-icons/gr";
import {
  Menu,
  MenuItem,
  Sidebar,
  MenuItemStyles,
 
  SubMenu
} from "react-pro-sidebar";


const SidebarView: React.FC = () => {
  



  const [collapsed, setCollapsed] = useState(false);
 
  
  return (
    
    <Sidebar style={{backgroundColor:"#000000", height:"145vh"} } defaultCollapsed={collapsed} >
      <Menu>
      <MenuItem icon={<FaThList />} onClick={() => setCollapsed(!collapsed)}/>
        
      
      </Menu>
        
      
      <Menu >
        <MenuItem icon={<FaColumns />} > Dashboard</MenuItem>
        
        <SubMenu label="Tables" icon={<FaTable />}>
        <MenuItem icon={<FaUserTie />} >Users</MenuItem>
        <MenuItem icon={<FaShoppingCart  />} >User Cart</MenuItem>
        <MenuItem icon={<GrTransaction  />} >Orders</MenuItem>
        
        
          <MenuItem >Skill Matrix</MenuItem>
          <MenuItem>Know Your Company</MenuItem>
          <MenuItem>Joining Day Information</MenuItem>
          <MenuItem>Feedback</MenuItem>
          <MenuItem>Background Check</MenuItem>
        </SubMenu>
        <MenuItem icon={<FaCog />}>Settings</MenuItem>
      </Menu>
    </Sidebar>
   
  );
};

export default SidebarView;
