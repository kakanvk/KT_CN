
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, Chip, ModalFooter, useDisclosure, user } from '@nextui-org/react';
import { useMemo, useState, useEffect } from 'react';

import { Link, Route, Routes } from 'react-router-dom';
import { addUser, getAllUser, updateRoleUser, softDeleteUser } from '../../../../service/UserService';
import { getCurrentUser } from '../../../../service/LoginService';

function UserManager(props) {

    const { setSpinning, successNoti, errorNoti } = props;

    const [newUser, setNewUser] = useState("");
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isDuplicateEmail = (email) => {
        const duplicates = users?.filter(user => user.email === email);
        return duplicates?.length > 0;
    };

    const fetchData = async () => {
        setSpinning(true);
        try {
            const [usersResponse, currentUserResponse] = await Promise.all([
                getAllUser(),
                getCurrentUser()
            ]);

            const currentUserEmail = currentUserResponse.data.email;

            // Lọc người dùng hiện tại ra khỏi danh sách
            const otherUsers = usersResponse.data.filter(user => user.email !== currentUserEmail);

            // Thêm người dùng hiện tại vào đầu danh sách
            const updatedUsers = [currentUserResponse.data, ...otherUsers];

            // Cập nhật state với mảng đã được sắp xếp lại
            setCurrentUser(currentUserResponse.data);
            setUsers(updatedUsers);
            setSpinning(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setSpinning(false);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await addUser(newUser);
            await fetchData();
            successNoti("Thêm thành công");
            setNewUser("");
        } catch (error) {
            console.log(error);
            errorNoti("Thêm thất bại");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await softDeleteUser(id);
            await fetchData();
            successNoti("Xoá thành công");
        } catch (error) {
            console.log(error);
            errorNoti("Xoá thất bại");
        }
    }

    return (
        <div className='flex flex-col gap-10 w-full'>
            <Breadcrumbs underline="hover">
                <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Quản lý người dùng</BreadcrumbItem>
            </Breadcrumbs>
            <div className='w-3/5 min-w-[500px] m-auto flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <div className='flex w-full gap-2'>
                        <Input
                            placeholder="kaka@example.com"
                            labelPlacement="outside"
                            variant='faded'
                            startContent={<i className="fa-solid fa-user opacity-60 mr-1"></i>}
                            value={newUser}
                            onValueChange={setNewUser}
                            isClearable
                            radius='sm'
                            type='email'
                        />
                        <Button
                            radius='sm'
                            className='text-[white] font-medium bg-green-500'
                            onClick={handleAddUser}
                            isDisabled={!isValidEmail(newUser) || isDuplicateEmail(newUser)}
                        >
                            Thêm
                        </Button>
                    </div>
                    {
                        newUser &&
                        !isValidEmail(newUser) &&
                        <span className='pl-4 text-[13px] text-red-500'><i className="fa-solid fa-circle-xmark mr-2"></i>Email không hợp lệ</span>
                    }
                    {
                        newUser &&
                        isDuplicateEmail(newUser) &&
                        <span className='pl-4 text-[13px] text-red-500'><i className="fa-solid fa-circle-xmark mr-2"></i>Email đã tồn tại</span>
                    }
                    {
                        newUser &&
                        isValidEmail(newUser) && !isDuplicateEmail(newUser) &&
                        <span className='pl-4 text-[13px] text-green-600'><i class="fa-solid fa-circle-check mr-2"></i>Email hợp lệ</span>
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    {users.map(user => (
                        <User key={user.id_user} user={user} isMyAccout={currentUser?.email === user.email} handleDeleteUser={handleDeleteUser}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserManager;

function User(props) {

    const { user, isMyAccout, handleDeleteUser } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedKeys, setSelectedKeys] = useState(new Set(user.role === 1 ? ["Super Admin"] : ["Admin"]));
    const selectedValue = useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys]);

    const handleChangeRole = async (newSelectedKeys) => {
        try {
            const newRole = newSelectedKeys.has("Super Admin") ? "SuperAdmin" : "Admin";
            const data = {
                id_user: user.id_user,
                role: newRole
            }
            await updateRoleUser(data);
            setSelectedKeys(newSelectedKeys);
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    return (
        <div className='flex items-center justify-between p-2 rounded-lg px-3 hover:bg-zinc-100 p-l-4'>
            <ConfirmAction
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                user={user}
                onConfirm={() => {
                    handleDeleteUser(user.id_user);
                }}
            />
            <div className='flex items-center gap-2'>
                <Avatar className="w-9 h-9 cursor-pointer" src={user.photoURL} />
                <div className="flex flex-col">
                    {user.name ? (
                        <span className={`text-[14px] font-semibold mb-[2px] ${isMyAccout && "text-green-600"}`}>{user.name} <span className='text-sm'>{isMyAccout ? "(Bạn)" : ""}</span></span>
                    ) : (
                        <span className="text-[12px] text-yellow-500 mb-[2px]">
                            <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                            Chưa đăng nhập
                        </span>
                    )}
                    <p className={`text-[13px] opacity-70 -mt-1`}>{user.email}</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <Dropdown className='scale-90'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                            size='sm'
                            isDisabled={isMyAccout}
                        >
                            {selectedValue}<i className="fa-solid fa-caret-down"></i>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleChangeRole}
                    >
                        <DropdownItem key="Admin">Admin</DropdownItem>
                        <DropdownItem key="Super Admin">Super Admin</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                    isIconOnly
                    size='sm'
                    radius='full'
                    variant='light'
                    color='danger'
                    isDisabled={isMyAccout}
                    onPress={onOpen}
                >
                    <i className="fa-regular fa-trash-can"></i>
                </Button>
            </div>
        </div>
    );
}

function ConfirmAction(props) {

    const { isOpen, onOpenChange, onConfirm, user } = props;

    const handleOnOKClick = (onClose) => {
        onClose();
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.2,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Xác nhận</ModalHeader>
                        <ModalBody>
                            <p className="text-[16px] align-baseline">
                                Xoá <Chip
                                    variant="flat"
                                    avatar={
                                        <Avatar
                                            src={user.photoURL}
                                        />
                                    }
                                    className='align-top -translate-y-1'
                                >
                                    {user.email}
                                </Chip> khỏi danh sách được phép truy cập Admin Dashboard, tiếp tục thao tác?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Huỷ
                            </Button>
                            <Button color="danger" className="font-medium" onPress={() => handleOnOKClick(onClose)}>
                                Xoá
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}