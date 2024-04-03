import { Route, Routes, Link } from "react-router-dom";
import LogoSET from "../../../../assets/KTCN-in.png";

import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tooltip,
    DropdownSection,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";

import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const [selectedKeys, setSelectedKeys] = useState(new Set([i18n.language]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <>
            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                maxWidth="2xl"
                classNames={{
                    base: "px-3 pl-6 md:px-10 bg-[#e95a13]",
                    wrapper: "px-0",
                    content: "gap-0",
                    item: "h-full items-center flex hover:bg-[white] hover:text-[#e95a13] duration-300",
                    menuItem: "py-3 border-b-[1px] border-gray-300",
                }}
                height="50px"
            >
                <NavbarContent className="xl:hidden flex gap-5" justify="start">
                    <NavbarMenuToggle className="text-[#fff]" />
                    <Link to="/">
                        <img src={LogoSET} width={18} className="mr-0" />
                    </Link>
                    <p className="text-[#fff] hidden sm:block font-semibold">
                        {t("menu.SET_name")}
                    </p>
                    <p className="text-[#fff] block sm:hidden font-semibold">
                        SET
                    </p>
                </NavbarContent>

                <NavbarContent
                    className="hidden xl:flex text-[#fff]"
                    justify="center"
                >
                    <Link to="/">
                        <img src={LogoSET} width={18} className="mr-5" />
                    </Link>
                    <NavbarItem>
                        <Link
                            to="#"
                            className="font-medium uppercase text-[13px] h-full flex items-center px-4"
                        >
                            {t("menu.text_link_1")}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="h-full relative group/prarent-link px-4">
                            <Link
                                to="#"
                                className="font-medium uppercase text-[13px] h-full flex items-center "
                            >
                                {t("menu.text_link_2.title")}
                                <i className="fa-solid fa-sort-down ml-3 -translate-y-1"></i>
                            </Link>
                            <div className="absolute flex flex-col -translate-x-4 invisible group-hover/prarent-link:visible delay-100">
                                <Link
                                    to="/about"
                                    className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300"
                                >
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_2.sub1")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_2.sub2")}
                                </Link>
                            </div>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="h-full relative group/prarent-link px-4">
                            <Link
                                to="#"
                                className="font-medium uppercase text-[13px] h-full flex items-center "
                            >
                                {t("menu.text_link_3.title")}
                                <i className="fa-solid fa-sort-down ml-3 -translate-y-1"></i>
                            </Link>
                            <div className="absolute flex flex-col -translate-x-4 invisible group-hover/prarent-link:visible delay-100">
                                <Link
                                    to="/news/category/activity-tvu"
                                    className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300"
                                >
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_3.sub1")}
                                </Link>
                                <Link
                                    to="/news/category/admission"
                                    className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300"
                                >
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_3.sub2")}
                                </Link>
                            </div>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="h-full relative group/prarent-link px-4">
                            <Link
                                to="#"
                                className="font-medium uppercase text-[13px] h-full flex items-center "
                            >
                                {t("menu.text_link_4.title")}
                                <i className="fa-solid fa-sort-down ml-3 -translate-y-1"></i>
                            </Link>
                            <div className="absolute flex flex-col -translate-x-4 invisible group-hover/prarent-link:visible delay-100">
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_4.sub1")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_4.sub2")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_4.sub3")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_4.sub4")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_4.sub5")}
                                </Link>
                            </div>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            to="#"
                            className="font-medium uppercase text-[13px] h-full flex items-center px-4"
                        >
                            {t("menu.text_link_5")}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="h-full relative group/prarent-link px-4">
                            <Link
                                to="#"
                                className="font-medium uppercase text-[13px] h-full flex items-center "
                            >
                                {t("menu.text_link_6.title")}
                                <i className="fa-solid fa-sort-down ml-3 -translate-y-1"></i>
                            </Link>
                            <div className="absolute flex flex-col -translate-x-4 invisible group-hover/prarent-link:visible delay-100">
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_6.sub1")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_6.sub2")}
                                </Link>
                            </div>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="h-full relative group/prarent-link px-4">
                            <Link
                                to="#"
                                className="font-medium uppercase text-[13px] h-full flex items-center "
                            >
                                {t("menu.text_link_7.title")}
                                <i className="fa-solid fa-sort-down ml-3 -translate-y-1"></i>
                            </Link>
                            <div className="absolute flex flex-col -translate-x-4 invisible group-hover/prarent-link:visible delay-100">
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_7.sub1")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_7.sub2")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_7.sub3")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_7.sub4")}
                                </Link>
                            </div>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="h-full relative group/prarent-link px-4">
                            <Link
                                to="#"
                                className="font-medium uppercase text-[13px] h-full flex items-center "
                            >
                                {t("menu.text_link_8.title")}
                                <i className="fa-solid fa-sort-down ml-3 -translate-y-1"></i>
                            </Link>
                            <div className="absolute flex flex-col -translate-x-4 invisible group-hover/prarent-link:visible delay-100">
                                <Link to="/student-set" className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_8.sub1")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_8.sub2")}
                                </Link>
                                <Link className="bg-zinc-200 hover:bg-zinc-300 text-gray-800 p-3 px-4 border-b-[1px] border-gray-300">
                                    <i className="fa-solid fa-caret-right mr-3"></i>
                                    {t("menu.text_link_8.sub3")}
                                </Link>
                            </div>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            to="#"
                            className="font-medium uppercase text-[13px] h-full flex items-center px-4"
                        >
                            {t("menu.text_link_9")}
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end" style={{ flexGrow: 0 }}>
                    <Dropdown>
                        <DropdownTrigger className="xl:hidden">
                            <Button variant="light" size="sm" isIconOnly>
                                <i className="fa-solid fa-ellipsis text-[white] text-[16px]"></i>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Static Actions"
                            classNames={{
                                list: "p-1",
                            }}
                            itemClasses={{
                                base: "w-[250px]",
                            }}
                        >
                            <DropdownSection
                                title={t("menu.section_text_1")}
                                showDivider
                            >
                                <DropdownItem
                                    as={Link}
                                    to="http://tvu.edu.vn"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    {t("header.left_text_tvu")}
                                </DropdownItem>
                                <DropdownItem
                                    as={Link}
                                    to="http://ttsv.tvu.edu.vn/"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    {t("header.left_text_1")}
                                </DropdownItem>
                                <DropdownItem
                                    as={Link}
                                    to="http://daotao.tvu.edu.vn/"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    {t("header.left_text_2")}
                                </DropdownItem>
                                <DropdownItem
                                    as={Link}
                                    to="http://khaothi.tvu.edu.vn/"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    {t("header.left_text_3")}
                                </DropdownItem>
                                <DropdownItem
                                    as={Link}
                                    to="https://celri.tvu.edu.vn/"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    {t("header.left_text_4")}
                                </DropdownItem>
                                <DropdownItem
                                    as={Link}
                                    to="http://ret.tvu.edu.vn"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    RET
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection
                                title={t("menu.section_text_2")}
                                className="mb-0"
                            >
                                <DropdownItem
                                    as={Link}
                                    to="/login"
                                    endContent={
                                        <i className="fa-solid fa-angle-right"></i>
                                    }
                                >
                                    {t("header.login_button_text")}
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="xl:hidden">
                            <Button variant="light" size="sm">
                                <Tooltip
                                    content={t("header.tooltip_text")}
                                    radius="sm"
                                    showArrow
                                    color="primary"
                                >
                                    <div className="flex gap-2 items-center">
                                        {selectedValue === "vi" ? (
                                            <Avatar
                                                alt="Việt Nam"
                                                className="w-5 h-5"
                                                src="https://flagcdn.com/vn.svg"
                                            />
                                        ) : (
                                            <Avatar
                                                alt="English"
                                                className="w-5 h-5"
                                                src="https://flagcdn.com/gb.svg"
                                            />
                                        )}
                                        <i className="fa-solid fa-caret-down text-[white]"></i>
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
                                startContent={
                                    <Avatar
                                        alt="Việt Nam"
                                        className="w-5 h-5"
                                        src="https://flagcdn.com/vn.svg"
                                    />
                                }
                                onClick={() => i18n.changeLanguage("vi")}
                            >
                                Tiếng Việt
                            </DropdownItem>
                            <DropdownItem
                                key="en"
                                startContent={
                                    <Avatar
                                        alt="English"
                                        className="w-5 h-5"
                                        src="https://flagcdn.com/gb.svg"
                                    />
                                }
                                onClick={() => i18n.changeLanguage("en")}
                            >
                                English
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button isIconOnly variant="light">
                        <i className="fa-solid fa-magnifying-glass text-[#fff] text-lg"></i>
                    </Button>
                </NavbarContent>

                <NavbarMenu className="pt-5 gap-0 bg-[white]">
                    <NavbarMenuItem>
                        <Link to="#" className="font-medium uppercase">
                            {t("menu.text_link_1")}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem className="p-0">
                        <Accordion className="gap-5 p-0">
                            <AccordionItem
                                key="1"
                                aria-label={t("menu.text_link_2")}
                                title={t("menu.text_link_2.title")}
                                classNames={{
                                    trigger: "py-3",
                                    title: "font-medium uppercase",
                                }}
                            >
                                <div className="flex flex-col gap-4 pl-4 pb-2">
                                    <Link to="/about" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_2.sub1")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_2.sub2")}
                                    </Link>
                                </div>
                            </AccordionItem>
                            <AccordionItem
                                key="2"
                                aria-label={t("menu.text_link_2")}
                                title={t("menu.text_link_3.title")}
                                classNames={{
                                    trigger: "py-3",
                                    title: "font-medium uppercase",
                                }}
                            >
                                <div className="flex flex-col gap-4 pl-4 pb-2">
                                    <Link
                                        to="/news/category/activity-tvu"
                                        className="font-medium"
                                    >
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_3.sub1")}
                                    </Link>
                                    <Link
                                        to="/news/category/admission"
                                        className="font-medium"
                                    >
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_3.sub2")}
                                    </Link>
                                </div>
                            </AccordionItem>
                            <AccordionItem
                                key="3"
                                aria-label={t("menu.text_link_2")}
                                title={t("menu.text_link_4.title")}
                                classNames={{
                                    trigger: "py-3",
                                    title: "font-medium uppercase",
                                }}
                            >
                                <div className="flex flex-col gap-4 pl-4 pb-2">
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_4.sub1")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_4.sub2")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_4.sub3")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_4.sub4")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_4.sub5")}
                                    </Link>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className="font-medium uppercase">
                            {t("menu.text_link_5")}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem className="p-0">
                        <Accordion className="gap-5 p-0">
                            <AccordionItem
                                key="4"
                                title={t("menu.text_link_6.title")}
                                classNames={{
                                    trigger: "py-3",
                                    title: "font-medium uppercase",
                                }}
                            >
                                <div className="flex flex-col gap-4 pl-4 pb-2">
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_6.sub1")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_6.sub2")}
                                    </Link>
                                </div>
                            </AccordionItem>
                            <AccordionItem
                                key="5"
                                aria-label={t("menu.text_link_2")}
                                title={t("menu.text_link_7.title")}
                                classNames={{
                                    trigger: "py-3",
                                    title: "font-medium uppercase",
                                }}
                            >
                                <div className="flex flex-col gap-4 pl-4 pb-2">
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_7.sub1")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_7.sub2")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_7.sub3")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_7.sub4")}
                                    </Link>
                                </div>
                            </AccordionItem>
                            <AccordionItem
                                key="6"
                                aria-label={t("menu.text_link_2")}
                                title={t("menu.text_link_8.title")}
                                classNames={{
                                    trigger: "py-3",
                                    title: "font-medium uppercase",
                                }}
                            >

            {/*----------------------------------link student-set----------------------------------*/}








                                <div className="flex flex-col gap-4 pl-4 pb-2">
                                    <Link to="/student-set" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_8.sub1")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_8.sub2")}
                                    </Link>
                                    <Link to="#" className="font-medium">
                                        <i className="fa-solid fa-caret-right mr-3"></i>
                                        {t("menu.text_link_8.sub3")}
                                    </Link>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className="font-medium uppercase">
                            {t("menu.text_link_9")}
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>
        </>
    );
}

export default Menu;
