import {Component} from 'react';
import Dropzone from 'react-dropzone';

import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentClear from 'material-ui/svg-icons/content/clear';

import {connect} from 'react-redux';

import {
  FlatButton,
} from 'components';

import {
  red, green, blue
} from 'styles/colors';

import IconRemove from 'react-icons/lib/md/highlight-remove';

class FileUploadUI extends Component {

  constructor() {
    super()
  }

  onChange(e) {
    e.preventDefault();
    // convert files to an array
    const files = [ ...e.target.files ];

    this.handleChange(files);
  }

  handleChange(files) {
    console.log("handling files", files)
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const file = acceptedFiles[0] || acceptedFiles

    if (this.props.onFile) {
      this.props.onFile(file)
    }

  }

  onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove()
    }
  }

  style() {
    return {
      width: '100%',
      minheight: 120,
      fontSize: 18,
      border: '3px solid '+ blue,
      color: blue,
      fontWeight: 300,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 10,
      paddingRight: 10
    };
  }

  styleDrop() {
    return {
      width: '100%',
      height: '100%',
      minHeight: 100,
      paddingTop: 40,
      paddingBottom: 40,
    };
  }

  fileStyle() {
    return(
      {
      }
    );
  }

  fileSize() {
    if (!this.props.file || !this.props.file.name){
      return 'No file detected';
    }

    const kb = parseFloat(this.props.file.size / 1024)
    const size = (kb / 1024).toFixed(1)

    if (size < 1) {
      return 'Small source of potential detected...'
    }

    if (kb > 1024) {
      return `${size} megabytes of potential`

    } else if (size > 0) {
      return `${Math.round(kb)} kilobytes of potential`
    }
  }

  renderFileContent() {
    const file = this.props.file;
    if (file && file.name) {
      return (
        <div style={{minHeight: 200}}>
          <h1>File Attached: {file.name}</h1>
        </div>
      )
    }
    if (!this.props.file && this.props.label) {
      return this.props.label;
    }

    return 'Drag file here';
  }

  renderFileDisplay(fileChosen) {
    if (!this.props.file || !this.props.file.name) {
      return '';
    }

    return (
      <div style={{ ...this.fileStyle(), minHeight: 60, paddingTop: 5, paddingBottom: 5}}>
        <h3 style={{fontSize: 14}}>{this.props.file.name}</h3>
        <h4 style={{fontSize: 16, color: '#30cdb7'}}>{this.fileSize()}</h4>
        <IconButton onClick={this.onRemove.bind(this)} className='remove-btn'>
          <ContentClear/>
        </IconButton>
      </div>
    );
  }

  stateClass() {
    if (this.props.file && this.props.file.name) {
      return ' file-chosen ';
    } else {
      return ' no-file-chosen ';
    }
  }

  render() {
    const fileDisplay = this.renderFileDisplay();

    return(
      <div style={this.style()} className={'file-uploader no-select' +this.stateClass() }>
        {this.props.file ? '' :
        <Dropzone multiple={false}
          ref={(node) => { this.dropzone = node; }}
          style={this.styleDrop()}
          onDrop={this.onDrop.bind(this)}>
          {this.renderFileContent()}
        </Dropzone>}
        {fileDisplay}
      </div>
    );
  }
}

const mapStateToProps = ((state)=> ({
  file: state.upload.fileChosen,
}));

const FileUpload = connect(mapStateToProps)(FileUploadUI);

export default FileUpload
export {FileUploadUI, FileUpload}
