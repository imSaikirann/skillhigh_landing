import React from 'react';
import one from '../assets/images/approvals/35.png';
import two from '../assets/images/approvals/36.png';
import three from '../assets/images/approvals/37.png';

const items = [
    { id: "1", image: one },
    { id: "2", image: two },
    { id: "3", image: three },
];

export default function ApprovalTag() {
    return (
        <div className="flex flex-col items-center justify-center py-16 font-inter bg-gray-50">
            <h1 className="text-center font-bold text-headings text-2xl sm:text-3xl lg:text-5xl mb-8">
                We are recognized by
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mt-8">
                {items.map(item => (
                    <img 
                        key={item.id} 
                        src={item.image} 
                        alt={`Approval ${item.id}`} 
                        className=" w-[400px] h-[250px] sm:w-[280px] sm:h-auto object-contain mx-auto"
                    />
                ))}
            </div>
        </div>
    );
}
