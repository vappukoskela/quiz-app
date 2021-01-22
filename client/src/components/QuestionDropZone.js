import axios from 'axios';
import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import superagent from 'superagent'
import strings from '../localization/strings';

function QuestionDropZone(props) {
    // https://github.com/react-dropzone/react-dropzone/tree/master/examples/styling

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };


    const onDrop = useCallback(async files => {
        console.log(files);

        const req = superagent.post('http://localhost:5000/upload');

        files.forEach(file => {
            req.attach('file', file);
            console.log(file)
        });
        req.end((err, res) => {
            console.log("THIS IS THE RES", res)
        });

    }, []);

    // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }));
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
      
    //https://github.com/react-dropzone/react-dropzone/tree/master/examples/basic
    return (
        <section>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <aside>
                <ul>{strings.files}</ul>
                <ul>{files}</ul>
            </aside>
        </section>
    )
}
export default QuestionDropZone;