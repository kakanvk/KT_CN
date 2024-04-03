
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, signOut} from "../../../../service/firebase";
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
}
    from "@nextui-org/react";

// import { Tooltip } from 'antd';

import { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

function Header() {

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const [selectedKeys, setSelectedKeys] = useState(new Set([i18n.language ? i18n.language : "vi"]));

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const Logout = async()=>{
        try {
            alert("Đăng nhập thất bại");
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }
    
    const handleLoginWithGoogle = async (onClose) => {
        try {
            const response = await signInWithGoogle();
            console.log(response);
            if (response) {
                navigate("/admin/");
            } else {
                Logout();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="Header hidden xl:flex">
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                disableAnimation
                classNames={{
                    header: "px-5",
                    body: "px-5",
                    footer: "px-5"
                }}
            >

                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Login to Admin Dashboard</ModalHeader>
                            <ModalBody>
                                <p>Đăng nhập dành cho quản trị viên</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" className='w-full bg-orange-600 font-medium' radius='sm' onPress={() => handleLoginWithGoogle(onClose)}>
                                    <i className="fa-brands fa-google"></i> Đăng nhập với Google
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Navbar
                disableAnimation
                // isBordered
                maxWidth="full"
                classNames={{
                    base: "px-6 h-12 pr-2 sm:pr-4",
                    wrapper: "px-0",
                    item: "hover:scale-95 duration-300"
                }}
            >
                <NavbarContent className="hidden lg:flex gap-4text-xs" justify="center">
                    <NavbarBrand>
                        <Link to="http://www.tvu.edu.vn/" target='_blank'>
                            <p className="font-bold text-inherit text-sm">{t('header.left_text_tvu')}</p>
                        </Link>
                    </NavbarBrand>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://ttsv.tvu.edu.vn/" target='_blank'>
                            {t('header.left_text_1')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://daotao.tvu.edu.vn/" target='_blank'>
                            {t('header.left_text_2')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://khaothi.tvu.edu.vn/" target='_blank'>
                            {t('header.left_text_3')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="https://celri.tvu.edu.vn/" target='_blank'>
                            {t('header.left_text_4')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://ret.tvu.edu.vn/" target='_blank'>
                            RET
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end" className='gap-2'>
                    <NavbarItem>
                        <Button variant="default" className="font-semibold text-sm hidden lg:flex text-orange-500" onPress={onOpen}>
                            {t('header.login_button_text')}
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="light"
                                    size='sm'
                                >
                                    <Tooltip content={t('header.tooltip_text')} radius="sm" showArrow color="primary">
                                        <div className='flex gap-2 items-center'>
                                            {selectedValue === "vi" ?
                                                <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" /> :
                                                <Avatar alt="English" className="w-5 h-5" src="https://flagcdn.com/gb.svg" />
                                            }
                                            <i className="fa-solid fa-caret-down"></i>
                                        </div>
                                    </Tooltip>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem
                                    key="vi"
                                    startContent={<Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" />}
                                    onClick={() => i18n.changeLanguage("vi")}
                                >
                                    Tiếng Việt
                                </DropdownItem>
                                <DropdownItem
                                    key="en"
                                    startContent={<Avatar alt="English" className="w-5 h-5" src="https://flagcdn.com/gb.svg" />
                                    }
                                    onClick={() => i18n.changeLanguage('en')}
                                >
                                    English
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    );
}

export default Header;
