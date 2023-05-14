export type Candidate = {
    id: number
    name: string
    email: string
    phone: number
    cpf: number
    academical: Academical[]
    professional: Professional[]
    languages: Language[]
    certifications: Certification[]
    personal_data: PersonalData[]
    diversity: Diversity[]
}

export type Academical = {
    id?: number
    formation_type: string
    degree?: string
    status: string
    course?: string
    institution: string
    start_date?: string
    end_date?: string
    candidate_id?: number
}

export type Professional = {
    id?: number
    company: string
    role: string
    start_date: string
    end_date?: string
    current_job: boolean
    activity_description: string
    candidate_id: number
}

export type Language = {
    id?: number
    language: string
    level: string
    candidate_id: number
}

export type Certification = {
    id?: number
    type: string
    title: string
    description: string
    candidate_id: number
}

export type PersonalData = {
    id?: number
    birth: string
    gender: string
    disability: boolean
    address: string
    cep: number
    state: string
    city: string
    linkedin: string
    cadidate_id?: number
}


export type Diversity = {
    id?: number
    origin_state: string
    origin_city: string
    pronouns: string
    sexuality: string
    gender: string
    color: string
    candidate_id?: number
}