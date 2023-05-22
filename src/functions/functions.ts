export const verifyCpf = (cpf: string): boolean => {
	const numero_validacao = parseInt(cpf[9])
	const numero2_validacao = parseInt(cpf[10])
	const noveDigitos = cpf.slice(0, 9)
	let contadorReg = 10
	let resultado = 0
	for (let i = 0; i < noveDigitos.length; i++) {
		resultado += parseInt(noveDigitos[i]) * contadorReg
		contadorReg -= 1
	}
	let digito_1 = (resultado * 10) % 11
	digito_1 = digito_1 <= 9 ? digito_1 : 0
	const confirmacao_digito1 = digito_1 === numero_validacao
	const dez_digitos = cpf.slice(0, 10)
	contadorReg = 11
	let resultado_1 = 0
	for (let i = 0; i < dez_digitos.length; i++) {
		resultado_1 += parseInt(dez_digitos[i]) * contadorReg
		contadorReg -= 1
	}
	let digito_2 = (resultado_1 * 10) % 11
	digito_2 = digito_2 <= 9 ? digito_2 : 0
	const confirmacao_digito2 = digito_2 === numero2_validacao

	if (confirmacao_digito1 && confirmacao_digito2) {
		return true
	} else {
		return false
	}
}

export function formatPhoneNumber(phoneNumber: string) {
	// Remove any non-digit characters from the phone number
	const digitsOnly = phoneNumber.replace(/\D/g, '')

	// Apply the formatting
	const formattedPhoneNumber = digitsOnly.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')

	return formattedPhoneNumber
}

export function calculateAge(dateOfBirth: string) {
	const today = new Date()
	const birthDate = new Date(dateOfBirth)

	let age = today.getFullYear() - birthDate.getFullYear()

	// Check if the birthday has occurred this year
	const hasBirthdayPassed =
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

	// Reduce the age by 1 if the birthday hasn't occurred yet
	if (!hasBirthdayPassed) {
		age--
	}

	return age
}
