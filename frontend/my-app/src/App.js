import './App.css';
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Dropzone, {useDropzone} from "react-dropzone";
import {ProgressBar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [completed, setCompleted] = useState(0);
    const [inProgress, setInProgress] = useState(false);

    /*useEffect(() => {
        if(completed === 100) {
            alert("Upload Completed!");
        }
    }, [completed])*/

    const onDrop = useCallback(acceptedFiles => {
        setInProgress(true);
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
            reader.onload = async () => {
                // Do whatever you want with the file contents
                // const binaryStr = reader.result;
                // console.log(binaryStr);
                // const text = e.target.result;
                const data = csvToArr(text);
                console.log(data.length);
                console.log("data: ", data);
                console.log(JSON.stringify(data));

                let formData = new FormData();
                formData.append('userList', JSON.stringify(data));
                console.log("formData: ", formData);

                const cntPerInsert = data.length / 2;
                const percentage = parseInt(100 * cntPerInsert / data.length);
                // setCompleted(100 * cntPerInsert / data.length);
                // let totalInsertCnt = 0;
                let tempArr = [];
                try {
                    for (let i = 0; i < data.length; i++) {
                        tempArr.push(data[i]);
                        if ((i + 1) % cntPerInsert == 0) {
                            const res = await axios.post(`http://localhost:8080/api/insert`, {userList: tempArr});
                            console.log("Success!");
                            setCompleted(prevValue => prevValue + percentage);
                            tempArr = [];
                        }
                    }
                    if (tempArr.length > 0) {
                        const res = await axios.post(`http://localhost:8080/api/insert`, {userList: tempArr});
                        setCompleted(100);
                        console.log("Success!");
                    }
                } catch (e) {
                    console.log("error: ", e);
                }
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
            <h1>Data Uploader</h1>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)} disabled={false}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className={"defaultStyle"}>Drag and drop some files here, or click to select files</div>
                        </div>
                    </section>
                )}
            </Dropzone>
            <div className={"margin_top"}>
                {inProgress &&
                <ProgressBar animated={true} bgcolor={"#6a1b9a"} now={completed} label={`${completed}%`}/>}
            </div>
        </div>
    );
}

export default App;