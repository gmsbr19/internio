const Card = ({
	children,
	title,
    addInfo
}: {
	children: React.ReactNode
	title: string
	addInfo?: () => void
}) => {
	return (
		<div className="card md:border md:border-gray-500 w-full md:w-[48rem] md:min-w-[480px] md:min-h-[75%] max-h-full md:max-h-[600px] bg-base-100 shadow-xl">
			<div className="card-body flex flex-col overflow-y-auto md:p-7 p-1">
				<div className="flex items-center mx-3">
					<div className="tabs w-full">
						<a className="tab tab-bordered tab-active">{title}</a>
					</div>
					{addInfo && <button className="btn btn-ghost" onClick={() => addInfo && addInfo()}>
						<i className="fa-solid fa-plus fa-lg"></i>
					</button>}
				</div>
				{children}
			</div>
		</div>
	)
}

export default Card
