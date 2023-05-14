import { useState } from 'react'

interface DataCollapseProps {
	children: React.ReactNode
	i: number
	id: number
	title: string
	deleteData: (i: number) => void
}

const DataCollapse: React.FC<DataCollapseProps> = ({ children, i, id, title, deleteData }) => {
	const [hovering, setHovering] = useState<boolean>()

	return (
		<div
			className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box h-full my-2"
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<input type="checkbox" />
			<div className="collapse-title flex justify-between text-xl font-medium">
				{`${title} ${i + 1}`}
				<i
					className={`bi bi-trash hover:text-red-500 z-50 ${hovering ? 'block' : 'hidden'}`}
					onClick={() => deleteData(id)}
				></i>
			</div>
			<div className="collapse-content">
				<form className="flex flex-col gap-2 w-full min-w-max">{children}</form>
			</div>
		</div>
	)
}

export default DataCollapse
