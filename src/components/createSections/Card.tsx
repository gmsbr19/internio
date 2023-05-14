const Card = ({children, title}: {children: React.ReactNode, title: string}) => {
    return (
        <div className="card w-full md:w-[480px] md:min-w-[480px] max-h-full md:max-h-[600px] overflow-y-auto bg-base-100 shadow-xl">
            <div className="card-body flex flex-col">
                <div className="tabs w-full">
                    <a className="tab tab-bordered tab-active mx-auto md:m-0">{title}</a> 
                </div>
                {children}
            </div>
        </div>
    );
}
 
export default Card;