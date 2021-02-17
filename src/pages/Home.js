import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import Table from '../components/Table'

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">EMPLOYEE DIRECTORY</h1>
            <p className="lead">View and Search the Employee Directory</p>
          </div>
        </div>
        <div className="container">
          <SearchForm />
          <Table />
        </div>
      </>
    )
  }
}

