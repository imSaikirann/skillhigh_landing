import React from 'react';
import Monitor from '../assets/MonitorPlay.png';
import Person from '../assets/personsvg.png';
import LockKeyOpen from '../assets/LockKeyOpen.png';

export default function Choose() {

    
    return (
        <div className='w-full h-auto py-8 px-4 font-inter'>
            <h1 className='text-center font-bold font-inter text-headings text-2xl sm:text-3xl lg:text-5xl mb-6'>
                Why Choose Us
            </h1>
            <div className='flex flex-col sm:flex-row md:flex-wrap lg:flex-nowrap justify-center items-center gap-6'>
                {/* Box 1 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
                    <img src={Person} className='w-[80px] h-[80px] mb-4' alt="Explore Courses" />
                    <h2 className='font-bold text-textColor font-inter text-lg lg:text-xl mb-2'>Real-World Learning</h2>
                    <p className='text-sm  font-medium  lg:text-base'>
                    SkillHigh provides practical, hands-on training with projects that align with current industry standards.
                    </p>
                </div>

                {/* Box 2 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
                    <img src={Monitor} className='w-[80px] h-[80px] mb-4' alt="Enroll & Learn" />
                    <h2 className='font-bold  text-textColor  font-inter text-lg lg:text-xl mb-2'>Industry-Aligned Curriculum
                    </h2>
                    <p className='text-sm font-medium lg:text-base'>
                    Our programs collaborate with leading companies to help you gain the skills employers want.
                    </p>
                </div>

                {/* Box 3 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
                    <img src={LockKeyOpen} className='w-[80px] h-[80px] mb-4' alt="Achieve & Grow" />
                    <h2 className='font-bold  text-textColor font-inter text-lg lg:text-xl mb-2'>Expert Mentorship</h2>
                    <p className='text-sm font-medium lg:text-base'>
                    Learn from experienced professionals in the field by gaining valuable insights and mentorship.

                    </p>
                </div>
            </div>
        </div>
    );
}
