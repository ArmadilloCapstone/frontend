//import DropdownMenu from "../Header/DropdownMenu"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setUserName, setUserOption } from '../../../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user_id = useSelector((state => state.user_id))
  const user_option = useSelector((state => state.user_option))

  
  const logoutClickHandler = () => {
    dispatch(setUserId(""));
    dispatch(setUserName(""));
    dispatch(setUserOption(""));
    localStorage.clear()
    navigate('/');
  };

  useEffect(() => {
    // dispatch(setUserId(localStorage.getItem('userid') || ""));
    // dispatch(setUserName(localStorage.getItem('username') || ""));
    // dispatch(setUserOption(localStorage.getItem('useroption') || ""));
    console.log(user_option)
    console.log(localStorage.getItem('useroption') || "")
  }, []);
    return (
        <header className="header">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">  </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
                {
                  user_id !== ""
                  ?
                <Nav className="ms-auto">
                  <NavDropdown title="내 정보" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/1.1">비밀번호 변경</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={logoutClickHandler}>로그아웃</Nav.Link>
                </Nav>
                :
                null
                }
              </Navbar.Collapse>
            </Navbar>

            {/* <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3 mt-4">
        <a href="#" class="list-group-item list-group-item-action py-2 ripple" aria-current="true">
          <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple active">
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-lock fa-fw me-3"></i><span>Password</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple">
          <i class="fas fa-chart-pie fa-fw me-3"></i><span>SEO</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-globe fa-fw me-3"></i><span>International</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-building fa-fw me-3"></i><span>Partners</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-calendar fa-fw me-3"></i><span>Calendar</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-users fa-fw me-3"></i><span>Users</span></a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"><i
            class="fas fa-money-bill fa-fw me-3"></i><span>Sales</span></a>
      </div>
    </div>
  </nav> */}
        </header>
    )
    
}

export default Header