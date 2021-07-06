import './App.css';
import {useCallback, useEffect} from "react";
import axios from "axios";
import Dropzone, {useDropzone} from "react-dropzone";
import {ProgressBar} from "react-bootstrap";


function App() {
    var qs = require('qs');

    const defaultStyle = {
        display: "inline-block",
        width: "500px",
        height: "150px",
        border: "1px solid black",
        background: "white",
    }
    useEffect(() => {
        axios.get("http://localhost:8080/api/test")
            .then(res => console.log(res.data))
            .catch(res => console.log(res.data))
    }, []);
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        acceptedFiles.forEach(async (file) => {
            console.log(file.text());
            const text = await file.text();
            console.log(text);
            console.log(typeof text);
            console.log("Text read!");
            const reader = new FileReader();
            reader.readAsText(file);
            // reader.onabort = () => console.log('file reading was aborted');
            // reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                // const binaryStr = reader.result;
                // console.log(binaryStr);
                // const text = e.target.result;
                const data = csvToArr(text);
                console.log(data.length);
                console.log("data: ",data);
                console.log(JSON.stringify(data));

                let formData = new FormData();
                formData.append('userList',JSON.stringify(data));
                console.log("formData: ", formData);

                axios.post(`http://localhost:8080/api/insert`, {
                        userList: data
                    }
                    // paramsSerializer: params => {
                    //     return qs.stringify(params);
                    // }
                )
                    .then(res => console.log("success!!"))
                    .catch(res => console.log(res.data))
            }
            // reader.readAsArrayBuffer(file);
        })
    }, []);

    function csvToArr(str, delimiter = ",") {
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        console.log("str: ", str);
        console.log(str.slice(0, str.indexOf("\n")))
        const headers = str.slice(0, str.indexOf("\n")).replace("\r", "").split(delimiter);
        console.log("headers: ", headers);

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        console.log(str.slice(str.indexOf("\n") + 1))
        const rows = str.slice(str.indexOf("\n") + 1).replaceAll("\r", "").split("\n");
        console.log("rows: ", rows);

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return el;
        });

        // return the array
        return arr;
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className="App">
            <h1>TEST~!!</h1>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)} disabled={false}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div style={defaultStyle}>Drag 'n' drop some files here, or click to select files</div>
                        </div>
                    </section>
                )}
            </Dropzone>
            <ProgressBar></ProgressBar>


            {/*<header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>*/}

        </div>
    );
}

export default App;