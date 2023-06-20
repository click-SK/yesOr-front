import React from 'react';

const TeamSection = () => {
    return (
        <section id='team' className='section team'>
            <div className='team_description'>
                <h2 className='section_title team_description_title'>Team</h2>
                <div className='team_description_text'>
                    <p>The Charitable Foundation is made up of dedicated agents and employees of Berkshire Hathaway HomeServices California Properties who want to make a positive and constructive impact on our local communities.</p>
                </div>
                <div>
                    <div className='exp_wrap'>
                        <div className='exp_wrap_item'>
                            <h2 className='exp_numb'>10</h2>
                            <p className='exp_text'>employees</p>
                        </div>
                        <div className='exp_wrap_item'>
                            <h2 className='exp_numb'>5</h2>
                            <p className='exp_text'>years of work</p>
                        </div>
                        <div className='exp_wrap_item'>
                            <h2 className='exp_numb'>2</h2>
                            <p className='exp_text'>office</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='team_courosel'>
                <div className='team_img_wrap'>
                    <div className='team_img_wrap_item active_img'>
                        <img  src="./mainPage/courosel/team/foto1.png" alt="" />
                        <div className='team_info'>
                            <p className='team_name'>Tom Ford</p>
                            <p className='employee'>manager</p>
                        </div>
                    </div>
                    <div className='team_img_wrap_item second_img'>
                        <img  src="./mainPage/courosel/team/foto2.png" alt="" />
                        <div className='team_info'>
                            <p className='team_name'>Tom Ford</p>
                            <p className='employee'>manager</p>
                        </div>
                    </div>
                    
                </div>
                <div className='courosel_count team_section_count'>
                    <p className='count_value'>01</p>
                    <div className='count_progress'>
                        <div className='progress_bg'></div>
                        <div className='progress_active'></div>
                    </div>
                    <p className='count_value'>05</p>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;