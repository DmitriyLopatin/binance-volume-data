"use client"
import React from 'react'

type Props = {
    currentPage: number
    setCurrentPage: (number: number) => void
    totalPages: number
}

const Pagination: React.FunctionComponent<Props> = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className='flex items-center justify-center my-6'>
            {[...Array(totalPages)].map((el, index) =>
                <div key={index}
                    className={`${index==currentPage&&'border border-indigo-600'} mx-1 py-[2px] px-[10px] rounded-[2px]`}
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index}
                </div>
            )}
        </div>
    )
}

export default Pagination