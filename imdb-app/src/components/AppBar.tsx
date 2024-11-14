import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface CustomAppBarProps {
  isLoggedIn: boolean;
  role: string | null;
  onLogout: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ isLoggedIn, role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          IMDb
        </Typography>
        {isLoggedIn ? (
          <>
            {role === 'admin' && (
              <>
                <Button color="inherit" onClick={() => navigate('/create-user')}>
                  Criar Usuário
                </Button>
                <Button color="inherit" onClick={() => navigate('/add-movie')}>
                  Cadastrar Filme
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
