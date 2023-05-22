import {FC} from 'react'

interface InputProps {
    label: string
    content: string
}

const Input: FC<InputProps> = ({label, content}) => {
	return (
		<div className="form-control w-full max-w-xs">
			<label className="label">
				<span className="label-text">{label}</span>
			</label>
			<input type="text" placeholder="" value={content} className="input input-bordered w-full max-w-xs pointer-events-none" />
		</div>
	)
}

export default Input
