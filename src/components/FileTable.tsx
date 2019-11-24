import React from 'react'

import MaterialTable, { Query, QueryResult, Column, Action } from "material-table";
import icons from "./TableIcons"
import { GetApp, Delete } from '@material-ui/icons';

import { gql } from 'apollo-boost'
import client from "./config/Apollo"

interface FileWrapper {
  id: string,
  name: string,
  type: string,
  uploadDate: Date
}

interface FileTableState {
  fileCount: number
}

class FileTable extends React.Component<{}, FileTableState> {

  private columnns : Column<FileWrapper>[] = [
    {title: "Filename", field: "name"},
    {title: "File Type", field: "type"},
    {title: "Upload Date", field: "uploadDate", render: (file) => this.dateString(new Date(file.uploadDate)) }
  ]

  private actions : Action<FileWrapper>[] = [
    { 
      icon: ( () => <GetApp color = "primary"></GetApp>), 
      tooltip: "Download file",
      onClick : ( (e : any, files : FileWrapper | FileWrapper[]) : void => {
        let selected = null;
        if(! Array.isArray(files) ){
          selected = [files];
        } else {
          selected = files;
        }
        selected!.map( (f : FileWrapper) => {
          this.download(f);
        })
      })
    },
  ]

  private MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  private GET_FILES = gql`
    query getFiles($page: Int!, $pageSize: Int!, $search: String!, $orderBy: String!, $orderDirection: String!){
      getFiles(page: $page, pageSize: $pageSize, search: $search, orderBy: $orderBy, orderDirection: $orderDirection){
        id
        name
        type
        uploadDate
      }
    }
  `

  private GET_FILE_URL = gql`
    query getFile($fileId: String!){
      getFile(fileId: $fileId)
    }
  `

  private DELETE_FILE = gql`
    mutation deleteFile($fileId: String!){
      deleteFile(fileId: $fileId)
    }
  `

  private GET_FILE_COUNT = gql`
    query getFileCount {
      getFileCount
    }
  `

  private getData = ( query : Query<FileWrapper> ) : Promise<QueryResult<FileWrapper>> => {
    const vars = {
      page: query.page,
      pageSize: query.pageSize,
      search: query.search == null ? "" : query.search,
      orderBy: query.orderBy == null ? "id" : query.orderBy.field,
      orderDirection: query.orderDirection
    }

    return client.query({
      query: this.GET_FILES,
      variables: vars
    }).then( (data : any, loading : boolean) => {
      if(data.loading){
        return {
          data: [],
          page: query.page,
          totalCount: 0
        }
      } else {
        return {
          data: data.data.getFiles,
          page: query.page,
          totalCount: this.state.fileCount
        }
      }
    })
  }

  private delete = (file : FileWrapper) : Promise<void> => {
    return client.mutate({
      mutation: this.DELETE_FILE,
      variables: {
        fileId: file.id
      }
    }).then( () => {
      return;
    })
  }

  private download = (file : FileWrapper) : void => {
    client.query({
      query: this.GET_FILE_URL,
      variables: {
        fileId: file.id
      }
    }).then( (res : any) => {
      window.location.href = res.data.getFile
    })
  }

  private dateString = (d : Date) : string => {
    return `${this.MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  }

  public componentDidMount = () => {
    client.query({
      query: this.GET_FILE_COUNT
    }).then( (data : any, loading: boolean) => {
      this.setState({...this.state, fileCount: data.data.getFileCount})
    })  
  }

  public render = () => {
    return (
      <MaterialTable<FileWrapper> 
        icons = {icons} 
        data = {this.getData} 
        columns={this.columnns} 
        actions = {this.actions} 
        editable = {{
          isDeletable: ( (f: FileWrapper) => true ),
          onRowDelete: this.delete
        }}
        localization={{
          header : {
            actions: ''
          }
        }}
        options={{
          emptyRowsWhenPaging: false,
        }}>
      </MaterialTable>
    )
  }
}

export default FileTable
