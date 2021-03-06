import './App.css';
import { useCallback, useState } from "react";
import axios from "axios";
import Dropzone, { useDropzone } from "react-dropzone";
import { ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [completed, setCompleted] = useState(0);
    const [inProgress, setInProgress] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(async (file) => {
            setInProgress(true);
            setCompleted(0);
            const reader = new FileReader();
            reader.readAsText(file);
            // reader.onabort = () => console.log('file reading was aborted');
            // reader.onerror = () => console.log('file reading has failed');
            reader.onload = async (e) => {
                console.log("e: ", e);
                const data = csvToArr(e.target.result); // csv데이터를 DTO의 형태에 맞게 변경
                const cntPerInsert = data.length / 2; // 한번 API 호출 당 전송할 데이터 갯수
                const percentage = parseInt(100 * cntPerInsert / data.length); // Insert API 한번 쏠 때 마다 올라갈 퍼센트
                let tempArr = [];
                try {
                    for (let i = 0; i < data.length; i++) {
                        tempArr.push(data[i]);
                        if ((i + 1) % cntPerInsert == 0) { // 전송할 데이터수에 도달하면 post api 전송
                            const res = await axios.post(`http://localhost:8080/api/insert`, {userList: tempArr});
                            console.log("Success!");
                            setCompleted(prevValue => prevValue + percentage); // 전송한 데이터량에 맞게 퍼센트 변경
                            tempArr = [];
                        }
                    }
                    if (tempArr.length > 0) { // 위 반복문에서 데이터를 전송한 후 아직 전송할 데이터가 남아있는 경우?
                        const res = await axios.post(`http://localhost:8080/api/insert`, {userList: tempArr});
                        setCompleted(100); // 마지막 전송이므로 100%
                        console.log("Success!");
                    }
                } catch (e) {
                    console.log("error: ", e);
                }
            }
        })
    }, []);

    function csvToArr(str, delimiter = ",") {
        const headers = str.slice(0, str.indexOf("\n")).replace("\r", "").split(delimiter); // csv 파일의 컬럼 리스트
        const rows = str.slice(str.indexOf("\n") + 1).replaceAll("\r", "").split("\n"); // csv 파일의 데이터
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return el;
        });
        return arr;
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className="App">
            <h1 id={"title"}>Data Uploader</h1>
            <Dropzone id={"dropzone"} onDrop={acceptedFiles => onDrop(acceptedFiles)} disabled={false}>
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
                <ProgressBar id={"progressbar"} animated={true} bgcolor={"#6a1b9a"} now={completed} label={`${completed}%`}/>}
            </div>
        </div>
    );
}

export default App;
