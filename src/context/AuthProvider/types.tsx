import { Res } from '.'
import {
	Candidate,
} from '../../types'

export interface IUser {
	email?: string
	token?: string
	type?: string
	id?: number
	data: Candidate | Company
}

export interface IContext extends IUser {
	authenticate: (email?: string, password?: string, type?: string) => Promise<Res>
	logout: () => void
}

export interface IAuthProvider {
	children: JSX.Element
}

export interface ICandidate {
	data: Candidate
	token: string
	id?: number
}

export interface ICompany {
	data: Company
	token: string
	id?: number
}
export interface Company {
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
