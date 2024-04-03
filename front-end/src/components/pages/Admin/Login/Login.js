
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { auth, signInWithGoogle, signOut} from "../../../../service/firebase";
import { postToken} from "../../../../service/LoginService";
import { Button } from "@nextui-org/react";

const Login = (props) => {
    const navigate = useNavigate();

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
            const user = await signInWithGoogle();
            const response = await postToken(user.email, user.uid, user.photoURL, user.displayName);
            if (response.data.email === user.email) {
                navigate("/admin/");
            } else {
                Logout();
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 500) {
                Logout();
            }
        }
    }
    return (
        <div>
            <Button color="primary" className="w-full" onClick={() => { handleLoginWithGoogle() }} >
                đăng nhập nè
            </Button>
        </div>
    )
}
export default Login