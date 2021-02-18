import React, { Component } from 'react'
import API from '../utils/API'
import dayjs from 'dayjs'

/*
Referenced this StackOverflow post for the sorting
https://stackoverflow.com/questions/44375407/how-to-make-a-table-in-reactjs-sortable/44375705
*/

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      sortedUsers: [],
      filteredUsers: [],
      sortFirstDESC: null,
      sortLastDESC: null
    }
    this.onSort = this.onSort.bind(this)
  }

  componentDidMount() {
    API.getUsers()
    .then(res => {
      // console.log(res.data.results);
      this.setState({ userList: res.data.results, sortedUsers: res.data.results })
      // console.log(this.state.userList);
    })
    .catch(err => console.log(err));
  }

  onSort = (key) => {
    const data = this.state.userList;
    // console.log(data[0].name[key])
    if(key === "first") {
      if(!this.state.sortFirstDESC || this.state.sortFirstDESC === null) {
        data.sort((a, b) => a.name[key].toLowerCase().localeCompare(b.name[key].toLowerCase()));
      } else {
        data.sort((a, b) => b.name[key].toLowerCase().localeCompare(a.name[key].toLowerCase()));
      }
      if(this.state.sortFirstDESC === null) {
        this.setState({sortFirstDESC: true})
      } else {
        this.setState({sortFirstDESC: !this.state.sortFirstDESC})
      }
      this.setState({sortLastDESC: null})
    } else {
      if(!this.state.sortLastDESC || this.state.sortLastDESC === null) {
        data.sort((a, b) => a.name[key].toLowerCase().localeCompare(b.name[key].toLowerCase()));
      } else {
        data.sort((a, b) => b.name[key].toLowerCase().localeCompare(a.name[key].toLowerCase()));
      }
      if(this.state.sortLastDESC === null) {
        this.setState({sortLastDESC: true})
      } else {
        this.setState({sortLastDESC: !this.state.sortLastDESC})
      }
      this.setState({sortFirstDESC: null})
    }
    this.setState({ sortedUsers: data });
    // console.log(this.state.sortedUsers);
  }

  filterUsers(value) {
    if(value !== "" && value !== undefined) {
      let filteredList = this.state.userList.filter(user => user.name.first.toLowerCase().includes(value) || user.name.last.toLowerCase().includes(value));
      this.setState({ filteredUsers: filteredList });
    } else {
      this.setState({ filteredUsers: [] });
    }
  }

  handleOnChange(e) {
    this.filterUsers(e.target.value);
  }

  handleOnSubmit(e) {
    e.preventDefault();
  }

  render() {
    let list = this.state.filteredUsers.length > 0 ? this.state.filteredUsers : this.state.sortedUsers;
    return (
      <div>
        <form className="form" onSubmit={(e) => this.handleOnSubmit(e)}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon2" onChange={(e) => this.handleOnChange(e)} />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={(e) => this.handleOnSubmit(e)}><i className="fas fa-search"></i></button>
          </div>
        </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th onClick={() => this.onSort("first")}>First Name {this.state.sortFirstDESC === null ? <i className="fas fa-sort"></i> : this.state.sortFirstDESC ? <i className="fas fa-sort-alpha-down"></i> : <i className="fas fa-sort-alpha-up"></i>}</th>
              <th onClick={() => this.onSort("last")} >Last Name {this.state.sortLastDESC === null ? <i className="fas fa-sort"></i> : this.state.sortLastDESC ? <i className="fas fa-sort-alpha-down"></i> : <i className="fas fa-sort-alpha-up"></i>}</th>
              <th>Location</th>
              <th>Email</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {list.map(user => <tr key={user.login.username}><td><img src={user.picture.medium} alt="{user.name.first} {user.name.last}"/></td><td>{user.name.first}</td><td>{user.name.last}</td><td>{user.location.street.number} {user.location.street.name}<br/>{user.location.city}, {user.location.state} {user.location.postcode}<br/>{user.location.country}</td><td>{user.email}</td><td>{dayjs(user.dob.date).format('MMM DD, YYYY')}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
