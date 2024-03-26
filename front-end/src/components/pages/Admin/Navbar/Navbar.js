import logo from "../../../../assets/KTCN.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, signOut } from "../../../../service/firebase";
import { postToken, logoutToken } from "../../../../service/LoginService";
import {
    User,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
    ScrollShadow,
    Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { motion } from "framer-motion";

function Navbar(props) {
    const navigate = useNavigate();

    const location = useLocation();
    const { collapsedNav, setCollapsedNav, setSpinning } = props;

    const [currentUser, setCurrentUser] = useState(null);
    //const [Authdata, setAuth] = useState(null);

    const setActive = (href) => {
        if (location.pathname === href) return "Admin_tab-active";
        // if (location.pathname.startsWith(href)) return "Admin_tab-active";
        return "";
    };

    const navTab = [
        {
            text: "Tổng quan",
            link: "/admin",
            icon: (
                <i
                    className={`fa-solid fa-bolt mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý bài viết",
            link: "/admin/post",
            icon: (
                <i
                    className={`fa-regular fa-images mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý chương trình",
            link: "/admin/program",
            icon: (
                <i
                    className={`fa-regular fa-images mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý danh mục",
            link: "/admin/category",
            icon: (
                <i
                    className={`fa-solid fa-icons mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý chuyên ngành",
            link: "/admin/major",
            icon: (
                <i
                    className={`fa-solid fa-pen-clip mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý môn học",
            link: "/admin/subject",
            icon: (
                <i
                    className={`fa-solid fa-pen-clip mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý quá trình làm việc",
            link: "/admin/work-process",
            icon: (
                <i
                    className={`fa-solid fa-pen-clip mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        }, 
        {
            text: "Quản lý người dùng",
            link: "/admin/user",
            icon: (
                <i
                    className={`fa-regular fa-user mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý bài báo khoa học",
            link: "/admin/scientific-article",
            icon: (
                <i
                    className={`fa-regular fa-user mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Quản lý dự án nghiên cứu",
            link: "/admin/research-projects",
            icon: (
                <i
                    className={`fa-regular fa-user mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
        {
            text: "Lịch sử thao tác",
            link: "/admin/log",
            icon: (
                <i
                    className={`fa-solid fa-clock-rotate-left mr-${
                        collapsedNav ? "0" : "3"
                    } w-4`}
                ></i>
            ),
        },
    ];

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const response = await postToken(
                    user.email,
                    user.uid,
                    user.photoURL,
                    user.displayName
                );
                if (response.data.email === user.email) {
                    setCurrentUser(response.data);
                }
            } else {
                alert("Bạn không có quyền vô trang này");
                await signOut(auth);
                setCurrentUser(null);
                navigate("/");
            }
        });
    }, []);

    const handleLoginWithGoogle = async (onClose) => {};
    const handleLogout = async () => {
        setSpinning(true);
        try {
            await Promise.all([signOut(auth), logoutToken()]);
            setSpinning(false);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleNav = () => {
        setCollapsedNav(!collapsedNav);
    };

    return (
        <motion.div
            className={`Admin-Navbar flex flex-col w-["270px"] ${
                collapsedNav ? "w-[87px]" : ""
            } h-[100vh] bg-slate-800 p-3 text-[white] justify-between`}
            initial={{ width: "270px" }}
            animate={{ width: collapsedNav ? "87px" : "270px" }}
            transition={{ duration: 0.4 }}
        >
            <div className="grid grid-rows-[auto,auto] h-[100vh] flex-1">
                <div
                    className={`flex w-full h-[50px] justify-${
                        collapsedNav ? "center" : "between"
                    } items-center p-${collapsedNav ? "2" : "3"}`}
                >
                    <motion.div
                        className="flex gap-3 items-center h-fit"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: collapsedNav ? 0 : 1 }}
                        transition={{
                            duration: collapsedNav ? 0 : 0.4,
                            delay: collapsedNav ? 0 : 0.4,
                        }}
                    >
                        {!collapsedNav ? (
                            <>
                                <img src={logo} width={20} alt="" />
                                <span className="font-bold mt-[1px]">SET</span>
                            </>
                        ) : (
                            ""
                        )}
                    </motion.div>
                    <Tooltip
                        title={collapsedNav ? "Mở rộng" : "Thu gọn"}
                        placement="right"
                    >
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            onClick={() => {
                                handleToggleNav();
                            }}
                        >
                            {collapsedNav ? (
                                <i className="fa-solid fa-chevron-right text-[white]"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-left text-[white]"></i>
                            )}
                        </Button>
                    </Tooltip>
                </div>
                <ScrollShadow
                    className="flex-1"
                    hideScrollBar
                    style={{ height: "calc(100vh - 130px)" }}
                >
                    <div className="flex flex-col gap-2 overflow-auto overflow-x-hidden">
                        <hr className="opacity-10 m-auto w-[30px] px-2 mb-2 border-[1.5px]" />
                        {navTab.map((tab) => {
                            return (
                                <Tooltip
                                    Tooltip
                                    title={collapsedNav ? tab.text : ""}
                                    placement="right"
                                    key={tab.link}
                                >
                                    <Link
                                        to={tab.link}
                                        className={`text-[14px] w-full h-[37px] hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${
                                            collapsedNav ? "center" : "between"
                                        } items-center group/tab ${setActive(
                                            tab.link
                                        )}`}
                                    >
                                        <p className="flex items-center">
                                            {tab.icon}
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: collapsedNav
                                                        ? 0
                                                        : 1,
                                                }}
                                                transition={{
                                                    duration: collapsedNav
                                                        ? 0
                                                        : 0.4,
                                                    delay: collapsedNav
                                                        ? 0
                                                        : 0.4,
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {!collapsedNav && tab.text}
                                            </motion.span>
                                        </p>
                                        {!collapsedNav && (
                                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                                        )}
                                    </Link>
                                </Tooltip>
                            );
                        })}
                    </div>
                </ScrollShadow>
            </div>
            <div className="h-fit">
                {currentUser ? (
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <div className="flex items-center w-full justify-between hover:bg-slate-600 p-3 py-2 rounded-lg">
                                <User
                                    name={
                                        !collapsedNav ? (
                                            <p className="font-semibold">
                                                {currentUser.displayName}
                                            </p>
                                        ) : (
                                            ""
                                        )
                                    }
                                    description={
                                        !collapsedNav ? currentUser.email : ""
                                    }
                                    avatarProps={{
                                        src: currentUser.photoURL,
                                    }}
                                    classNames={{
                                        base: `${
                                            collapsedNav ? "gap-0" : "gap-2"
                                        }`,
                                    }}
                                />
                                {!collapsedNav ? (
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                ) : null}
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="User Actions"
                            classNames={{
                                base: "min-w-[230px]",
                            }}
                        >
                            <DropdownItem
                                key="profile"
                                className="h-14 gap-2"
                                isReadOnly
                            >
                                <p className="font-semibold opacity-50">
                                    {currentUser?.role === 1
                                        ? "Super Admin"
                                        : "Admin"}
                                </p>
                                <p className="font-bold">{currentUser.email}</p>
                            </DropdownItem>
                            <DropdownSection showDivider>
                                <DropdownItem
                                    key="settings"
                                    startContent={
                                        <i className="fa-solid fa-gear"></i>
                                    }
                                >
                                    Cài đặt
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                startContent={
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                }
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                Đăng xuất
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button
                        color="primary"
                        className="w-full"
                        onClick={() => {
                            handleLoginWithGoogle();
                        }}
                        isIconOnly={collapsedNav}
                    >
                        {collapsedNav ? (
                            <i className="fa-solid fa-right-to-bracket"></i>
                        ) : (
                            "Đăng nhập"
                        )}
                    </Button>
                )}
            </div>
        </motion.div>
    );
}

export default Navbar;
