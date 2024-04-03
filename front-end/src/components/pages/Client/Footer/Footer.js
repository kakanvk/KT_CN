
import { Link, Route, Routes } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function Footer() {

    const { t } = useTranslation();

    return (
        <div className="Footer bg-zinc-100 text-[black] p-8 py-10 md:px-[120px] flex flex-col gap-10 items-center border-[#e95a139] border-t-4">
            <div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-20 flex-wrap max-w-[2000px] w-full'>
                <div className='flex flex-col gap-3 max-w-[400px]'>
                    <h3 className='font-bold uppercase text-[#e95a13]'>{t('menu.SET_name')}</h3>
                    <p className='text-sm'><i className="fa-solid fa-location-dot mr-3"></i>{t('footer.address')}</p>
                    <p className='text-sm'><i className="fa-solid fa-phone mr-3"></i>0294.3855690 – 135</p>
                    <p className='text-sm'><i className="fa-solid fa-envelope mr-3"></i>ktcn@tvu.edu.vn</p>
                    <Link className='text-sm' to="https://www.facebook.com/tvuset"><i className="fa-brands fa-facebook mr-3"></i>TVU - SET</Link>
                </div>
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold uppercase text-sky-700'>{t('header.left_text_tvu')}</h3>
                    <Link className='text-sm'>{t('menu.text_link_1')}</Link>
                    <Link className='text-sm'>{t('header.left_text_1')}</Link>
                    <Link className='text-sm'>{t('header.left_text_2')}</Link>
                    <Link className='text-sm'>{t('header.left_text_3')}</Link>
                    <Link className='text-sm'>{t('header.left_text_4')}</Link>
                </div>
                <div className='flex flex-col gap-3 flex-1 max-w-[270px] min-w-[200px]'>
                    <h3 className='font-bold uppercase text-[#e95a13]'>{t('footer.explore_text')}</h3>
                    <div className='flex justify-between w-full'>
                        <div className='flex flex-col gap-3'>
                            <Link className='text-sm'>{t('menu.text_link_1')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_2.title')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_3.title')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_4.title')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_5')}</Link>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Link className='text-sm'>{t('menu.text_link_6.title')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_7.title')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_8.title')}</Link>
                            <Link className='text-sm'>{t('menu.text_link_9')}</Link>
                            <Link className='text-sm' to="https://ret.tvu.edu.vn/">RET</Link>
                        </div>
                    </div>
                </div>
                
            </div>
            <div>
                <p className='text-[13px] opacity-50 text-center'>
                    {t('footer.copyright')}
                </p>
            </div>
        </div>
    );
}

export default Footer;
