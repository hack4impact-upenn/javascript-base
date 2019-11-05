import React from "react";
import Dropzone from "react-dropzone"
import { Button, Typography, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { CloudUpload, InsertDriveFile, Delete, PersonAdd } from '@material-ui/icons'

import client from "./config/Apollo"
import { gql } from "apollo-boost";

import { ValidatorForm } from 'react-material-ui-form-validator';

// To be changed once more info added to file upload
type FileUpload = File;

interface FileUploadFormState {
  files: FileUpload[]
}

class FileUploadForm extends React.Component<{}, FileUploadFormState> {
  state = {
    files: []
  }

  private UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
      uploadFile(file: $file)
    }
  `;

  private handleDrop = (files: File[]) => {
    const old_files = this.state.files;
    const new_files = files.concat(old_files);
    this.setState({ ...this.state, files: new_files })
  }

  private handleFileUpload = () => {
    this.state.files.map((file: File) => {
      client.mutate({
        mutation: this.UPLOAD_FILE,
        variables: {
          file: file
        }
      }).catch((error: any) => {
        console.log(error)
      }).then((data: any) => {
        console.log(data)
      })
    })
  }

  private removeFile = (file : File) => {
    let files = this.state.files.filter( (value) => {
      return file !== value;
    });
    this.setState({...this.state, files: files});
  }

  public render = () => {
    const files = this.state.files.map((file: File) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <ValidatorForm onSubmit={this.handleFileUpload} style={{
        padding: "20px",
        marginTop: "40px",
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
      }}>
        <Dropzone onDrop={this.handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div style={{ padding: "20%", border: "1px dashed lightgray", textAlign: "center" }} {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <CloudUpload color="primary" style={{ width: "100%", fontSize: "5rem" }}></CloudUpload>
              <br></br>
              <Typography variant="caption">Drag and Drag or Click to Upload Files</Typography>
            </div>
          )}
        </Dropzone>
        <List>
          {this.state.files.map((file: File) => {
            // TODO : Add user sharing
            return (
              <ListItem style={{ backgroundColor: "whitesmoke", padding: "10px", margin: "10px auto", boxShadow: "0 2px 1px #bbb" }}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={file.name}></ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="share">
                    <PersonAdd /> 
                  </IconButton>
                  <IconButton onClick = {(e) => this.removeFile(file)} edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
        <Button type="submit" style={{ margin: "10px 0" }} variant="contained" color="primary" >Upload</Button>
      </ValidatorForm>
    )
  }
}

export default FileUploadForm