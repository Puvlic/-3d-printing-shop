import React from 'react';
import css from './Maket.module.css'
import uploadImg from '../Images/uploadImg.png'

const Maket = (props) => {
    debugger
    let fileTypes = props.uploadFileTypes
    let currentUploadImg = props.currentUploadImg
    let selectedFile = props.selectedFile
    let reader = new FileReader()

    const SelectFile = (file) => {
        props.onSelectFile(file)
    }

    const AddUploadFile = () => {
        if (!selectedFile) {
            window.alert('Выберите файл')
        }
        else {
            window.alert('Файл отправлен на проверку')
            props.onAddUploadFile(selectedFile)
            props.onChangeCurrentUploadFile(null)
            SelectFile(null)
        }
    }

    const SelectUploadFile = (event) => {
        debugger
        for (let i = 0; i < fileTypes.length; i++) {
            if (event.target.files[0].type === fileTypes[i]){
                SelectFile(event.target.files[0])
                reader.readAsDataURL(event.target.files[0])
                reader.onload = (e) => {
                    props.onChangeCurrentUploadFile(reader.result)
                }
                return
            }
            debugger
        }
        if (!props.selectedFile) {
            window.alert('Не верное разрешение файла')
            currentUploadImg = ''
            event.target = null
        }
    }

    return (
        <div className={css.body}>
            <img src={currentUploadImg === null ? uploadImg : currentUploadImg} className={css.maket}/>
            <div className={css.maket_buttons}>
                <label className={css.upload_file}>
                    <input className={css.file} type="file" onChange={SelectUploadFile} accept={'image/*'}></input>
                    Загрузить файл
                </label>
                <button className={css.button} onClick={AddUploadFile}>Отправить файл</button>
            </div>
        </div>
    );
};

export default Maket;