
export type patient = {
    id: string,
    name: string,
    caretaker: string,
    email: string,
    date: Date,
    symptoms: string
}

export type DraftPatient = Omit<patient, 'id'>