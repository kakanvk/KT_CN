import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return ( 
        <div className='flex w-full	 items-center justify-center text-justify leading-7'>
            <div className='w-[1140px] p-5 flex flex-col gap-[10px]'>
                <h1 className='p-5 font-bold text-center text-2xl'> {t('about.text_about_1')}</h1>
                <h2 className='text-center text-xl'>{t('about.text_about_2')}</h2>
                <p>
                    {t('about.text_about_body_1')}
                </p>

                <p>{t('about.text_about_body_2')}</p>
                <p>
                    {t('about.text_about_body_3')}
                </p>
                <p>
                    {t('about.text_about_body_4')}
                </p>
            </div>
        </div>
    );
}

export default About;
