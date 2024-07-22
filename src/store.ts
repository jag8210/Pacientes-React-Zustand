import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { devtools, persist} from 'zustand/middleware'
import { DraftPatient, patient } from './types'


type PatientState = {
    patients: patient[];
    activeId: patient["id"];
    addPatient: (data: DraftPatient) => void;
    deletePatient: (id: patient["id"]) => void;
    getPatientById: (id: patient["id"]) => void;
    updatePatient: (data: DraftPatient) => void;
};

const createPatient = ( patient: DraftPatient): patient => {
 return {
    ...patient, id: uuidv4()
 }
}

export const usePatientStore = create<PatientState>()(devtools(
    
        persist((set)=> ({
        patients: [],
        activeId: '',
        addPatient: (data) => {
            const newPatient = createPatient(data)
            set((state)=>({
                patients: [ ...state.patients, newPatient]
            }))
        },
        deletePatient : (id) => {
            set((state)=> ({
                patients : state.patients.filter(patient => patient.id !== id)
            }))
        },
        getPatientById: (id) => {
            set(()=>({
                activeId: id
            }))
        },
        updatePatient: (data)=> {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data }: patient),
                activeId: ''
            }))
    }
}),{
    name:'patient-storage'
})
))