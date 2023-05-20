import {
	Academical,
	Certification,
	Diversity,
	Language,
	PersonalData,
	Professional
} from '../../types'

export interface IUser {
	email?: string
	token?: string
	type?: string
	id?: number
	data?: ICandidate | ICompanyData['data']
}

export interface IContext extends IUser {
	authenticate: (email: string, password: string, type: string) => Promise<void>
	logout: () => void
}

export interface IAuthProvider {
	children: JSX.Element
}

export interface ICandidate {
	data: {
		cpf?: string
		email?: string
		id?: number
		name?: string
		phone?: number
		academicals?: Academical[]
		professionals?: Professional[]
		languages?: Language[]
		certifications?: Certification[]
		personal_data?: PersonalData
		diversities?: Diversity
	}
	token: string
	id?: number
}

export interface ICompanyData {
	data: {
		id: number
		trading_name: string
		official_name: string
		cnpj: string
		address: string
		cep: string
		city: string
		state: string
		representative_name: string
		representative_email: string
		representative_phone: number
	}
	token: string
	id?: number
}
