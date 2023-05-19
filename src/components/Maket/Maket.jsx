import React, {useEffect, useRef, useState} from 'react';
import css from './Maket.module.css'
import maket from '../Images/maket.jpg'
import axios from "axios";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";

const Maket = (props) => {

    const [name, setName] = useState(undefined)
    const [address, setAddress] = useState("")
    const [file, setFile] = useState({name: undefined})
    const [validation, SetValidation] = useState("Файл не загружен")

    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    let selectedFile = props.selectedFile
    let reader = new FileReader()

    const SelectFile = (file) => {
        props.onSelectFile(file)
    }

    console.log(file)

    const AddUploadFile = async () => {
        if (file.name === undefined) {
            SetValidation("Файл не был выбран")
            return
        }
        if (!address) {
            SetValidation("Поле адреса не было введено")
            return
        }

        const formData = new FormData();
        console.log(file)
        formData.append('stlFile', file);
        let file_url = ""

        await axios.post('http://localhost:8080/api/upload', formData, {
            headers: {
                "content-type": "multipart/from-data"
            }
        }).then(response => {
            console.log(response)
            file_url = response.data.path
        }).catch(error => {})

        await axios.post('http://localhost:8080/api/maket', {
            user_id: decoded.id,
            file_url: file_url,
            price: 0,
            status: "Проверка",
            accept_status: 1,
            original_file_name: file.name,
            address: address
        }).then(r => {
            console.log(r)
        })
    }

    const UploadFile = (event) => {
        console.log(event.target.files[0].name)
        let fileExtension = event.target.files[0].name.split('.').pop()
        console.log(fileExtension)
        if (fileExtension === 'stl') {
            setFile(event.target.files[0])
        }
        else {
            SetValidation("Неверное расширение файла")
            setFile({name: undefined})
        }
    }

    return (
        <div className={css.body}>
            {/*<img src={currentUploadImg === null ? uploadImg : currentUploadImg} className={css.maket}/>*/}
            <div className={css.maket_buttons}>
                <label className={css.upload_file}>
                    <input className={css.file} type="file" onChange={UploadFile} accept={'model/stl'}></input>
                    Загрузить файл
                </label>
                <button className={css.button} onClick={AddUploadFile}>Отправить файл</button>
            </div>
            <div className={css.input_wrapper}>
                <input className={css.input} placeholder='Адрес' value={address} onChange={e => setAddress(e.target.value)}  type="text"/>
            </div>
            <div className={css.file_name}>
                {file.name ? "Имя файла: " + file.name : validation}
            </div>
        </div>
    );
};

export default Maket;