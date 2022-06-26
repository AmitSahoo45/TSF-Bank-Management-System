import { Routes, Route } from 'react-router-dom'
import './App.css';
import { HomePage, Customer } from './containers'
import { SingleCustomer, User } from './components'

import { Container } from '@nextui-org/react';

function App() {
  return (
    <div className="App">
      <h1>Banking Management System</h1>
      <Container>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/api/user/all' element={<Customer />} />
          <Route path='/api/user/:id' element={<User />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
