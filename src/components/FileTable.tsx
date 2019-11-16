import React from 'react'
import { gql } from 'apollo-boost'

import { Table, TableRow, TableHead, TableCell, IconButton, TableBody, Paper, CircularProgress, Typography } from "@material-ui/core"
import { GetApp, PersonAdd, Delete } from '@material-ui/icons'

import client from "./config/Apollo"

interface FileWrapper {
  id: string,
  name: string,
  type: string,
  uploadDate: Date
}

interface FileTableState {
  files: FileWrapper[],
  loading: Boolean
  // The field to order the table by
  order_field: string,
  order_desc: Boolean,
}

class FileTable extends React.Component<{}, FileTableState> {
  state = {
    files: [] as FileWrapper[],
    loading: true,
    order_field: "name",
    order_desc: false
  }

  private GET_FILES = gql`
    query getFiles($first: Int!, $cursor: Int!, $sort: String!, $desc: Boolean!){
      getFiles(first: $first, cursor: $cursor, sort: $sort, desc: $desc){
        id
        name
        type
        uploadDate
      }
    }
  `

  private GET_FILE = gql`
    query getFile($fileId: String!){
      getFile(fileId: $fileId)
    }
  `

  private DELETE_FILE = gql`
    mutation deleteFile($fileId: String!){
      deleteFile(fileId: $fileId)
    }
  `

  private MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  private getFiles = (first: number, cursor: number, sort: string, desc: boolean): Promise<Array<FileWrapper>> => {
    return client.query({
      query: this.GET_FILES,
      variables: {
        first: first,
        cursor: cursor,
        sort: sort,
        desc: desc
      }
    }).then((data: any) => {
      this.setState({ ...this.state, files: data.data.getFiles, loading: false })
    })
  }

  private delete = (file : FileWrapper) : void => {
    client.mutate({
      mutation: this.DELETE_FILE,
      variables: {
        fileId: file.id
      }
    })
    const newFiles : FileWrapper[] = this.state.files.filter( (f : FileWrapper) => {
      return f.id != file.id
    })
    this.setState({ ...this.state, files: newFiles});
  }

  private download = (file : FileWrapper) : void => {
    client.query({
      query: this.GET_FILE,
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
    this.getFiles(100, 0, "name", false);
  }

  public render = () => {
    return (
      <Paper>
        { this.state.loading &&
          <div style = {{ textAlign: "center", padding: "100px" }}>
            <CircularProgress size = {80}/>
          </div>
        }
        { !this.state.loading &&
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>File</TableCell>
              <TableCell>Upload Date</TableCell>
              {/* <TableCell padding="checkbox"></TableCell> */}
              <TableCell padding="checkbox"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.files.length != 0 && this.state.files.map((file: FileWrapper) => (
              <TableRow key={file.id}>
                <TableCell padding="checkbox">
                  <IconButton onClick={(e) => { this.download(file) }}>
                    <GetApp color="primary" ></GetApp>
                  </IconButton>
                </TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{ this.dateString(new Date(file.uploadDate)) }</TableCell>
                {/* <TableCell padding="checkbox">
                  <IconButton onClick={(e) => { alert("Not implemented yet") }}>
                    <PersonAdd></PersonAdd>
                  </IconButton>
                </TableCell> */}
                <TableCell padding="checkbox">
                  <IconButton onClick={(e) => { this.delete(file) }}>
                    <Delete color="error" ></Delete>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
        }
        { !this.state.loading && this.state.files.length == 0 &&
          <div style = {{ textAlign: "center", padding: "100px" }}>
            <Typography variant = "h5"> No Files Uploaded Yet</Typography>
          </div>
        }
      </Paper>
    )
  }
}

export default FileTable
