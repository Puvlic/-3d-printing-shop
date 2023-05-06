const ADD_UPLOAD_FILE = "ADD-UPLOAD-FILE"
const CHANGE_CURRENT_UPLOAD_FILE = "CHANGE-CURRENT-UPLOAD-FILE"
const SELECT_FILE = "SELECT-FILE"

const InitialMaket = {
    _maxFilesCount: 9,
    _uploadFileTypes: [
        'model/stl'
    ],
    uploadFiles: [],
    currentUploadImg: null,
    selectedFile: null
}

const MaketReducer = (state = InitialMaket, action) => {
    switch (action.type) {
        case ADD_UPLOAD_FILE: {
            if (state.uploadFiles.length < state._maxFilesCount){
                return {
                    ...state,
                    uploadFiles: [...state.uploadFiles, action.file]
                }
            }
            else {
                window.alert('Превышено значение загружаемых файлов')
                return state
            }

        }
        case SELECT_FILE: {
            return {
                ...state,
                selectedFile: action.file
            }
        }
        case CHANGE_CURRENT_UPLOAD_FILE:
            return {
                ...state,
                currentUploadImg: action.url
            }
        default:
            return state
    }
}

export const ChangeCurrentUploadImgActionCreator = (url) => ({type: CHANGE_CURRENT_UPLOAD_FILE, url: url})
export const AddUploadFileActionCreator = (file) => ({type: ADD_UPLOAD_FILE, file: file})
export const SelectFileActionCreator = (file) => ({type: SELECT_FILE, file: file})

export default MaketReducer