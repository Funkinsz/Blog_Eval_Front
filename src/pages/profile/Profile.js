import { useContext } from "react"
import { AuthContext } from "../../context"

export default function Profile() {
    const { user } = useContext(AuthContext)

    console.log(user);
    return <h1>PROFILE</h1>
}