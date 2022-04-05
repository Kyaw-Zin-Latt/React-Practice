import React from 'react'

import Header from './components/Header';
import Layout from './components/Layout';
import Table from './components/Table';
// import logo from './logo.svg';
import './style.scss';
import  { FeedbackProvider } from './context/FeedbackContext';
import Form from './components/Form';


function App() {

 

  return (
    <FeedbackProvider>
      <Layout>
        <Header title="Voucher Maker" color="text-primary" />
        <Form />
        <Table />
      </Layout>
    </FeedbackProvider>
  )
}

export default App