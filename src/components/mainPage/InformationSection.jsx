import React from 'react';

const InformationSection = () => {
    return (
        <section id='information' className='section information'>
            <div className='bg_courosel'></div>
            <div className='information_description'>
                <h2 className='section_title information_description_title'>Information</h2>
                <div className='information_description_text'>
                    <p>Our centerpiece article is your guide to successfully using YesOr. Here you'll find all the essential information about our platform's capabilities, usage recommendations, success stories from other users, as well as answers to frequently asked questions.</p>
                    <p>What you will discover: <br/>
- Getting Started: A step-by-step guide to launching your project or supporting a campaign.<br/>
- Success Stories: Inspiring tales of those who have already turned their dreams into reality with YesOr.<br/>
- FAQ: Answers to common questions to ensure a smooth start.<br/>
- Best Practices: Tips and tricks for optimizing your crowdfunding journey.<br/>
- Contact Us: Reach out to our friendly team if you need assistance.<br/>
</p>
                    <p>Explore our information hub and make the most of your YesOr experience. Your path to success begins here! </p>
                    
                </div>
            </div>
            <div className='information_courosel'>
                <div className='information_img_wrap'>
                    <img src="./mainPage/information_section/foto1.png" alt="" />
                    <img src="./mainPage/information_section/foto2.png" alt="" />
                    <img src="./mainPage/information_section/foto3.png" alt="" />
                    <img src="./mainPage/information_section/foto4.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default InformationSection;