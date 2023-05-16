import React from 'react'

const FormRow = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={`flex flex-col md:flex-row gap-1 md:gap-3 justify-between`}>
            {children}
        </div>
    );
}
 
export default FormRow;