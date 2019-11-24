import React from 'react';
import MaterialTable, { Query, QueryResult, Column } from "material-table";

import { gql } from "apollo-boost";
import client from "../config/Apollo";
import icons from "../TableIcons"

interface UserTableState {
  userCount: number
}

interface User {
  firstName: string,
  lastName: string,
  email: string,
  role: string
}

class UserTable extends React.Component<{}, UserTableState> {
  private columns : Column<User>[] = [
    {title: "First Name", field: "firstName"},
    {title: "Last Name", field: "lastName"},
    {title: "Email", field: "email"},
    {title: "Role", field: "role"}
  ]

  private GET_USERS_QUERY = gql`
    query getUsers($page: Int!, $pageSize: Int!, $search: String!, $orderBy: String!, $orderDirection: String!){
      getUsers(page: $page, pageSize: $pageSize, search: $search, orderBy: $orderBy, orderDirection: $orderDirection){
        firstName
        lastName
        email
        role
      }
    }
  `

  public componentDidMount = () => {
    client.query({
      query: this.GET_USER_COUNT
    }).then( (data : any) => {
      this.setState({...this.state, userCount: data.data.userCount})
    })
  }

  private GET_USER_COUNT = gql`
    query userCount {
      userCount
    }
  `

  private getData = ( query: Query<User> ) : Promise<QueryResult<User>> => {
    const vars = {
      page: query.page,
      pageSize: query.pageSize,
      search: query.search == null ? "" : query.search,
      orderBy: query.orderBy == null ? "id" : query.orderBy.field,
      orderDirection: query.orderDirection
    }
    return client.query({
      query: this.GET_USERS_QUERY,
      variables: vars
    }).then( (data: any, loading: boolean) => {
      if(data.loading){
        return {
          data: [],
          page: query.page,
          totalCount: 0
        }
      } else {
        return {
          data: data.data.getUsers,
          page: query.page,
          totalCount: this.state.userCount
        }
      }
    })
  }

  public render = () => {
    return (
      <MaterialTable<User> title = "Users" icons = { icons } columns = {this.columns} data = {this.getData} options={{
        emptyRowsWhenPaging: false,
        selection: true 
      }}>

      </MaterialTable>
    )
  }
}

export default UserTable