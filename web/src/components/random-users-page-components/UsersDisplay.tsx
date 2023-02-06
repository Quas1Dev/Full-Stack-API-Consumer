import Card from "./Card";
import { RandomUserData } from "../../interfaces/RandomUsersInterfaces";

interface UserDisplayInterface {
    users: RandomUserData[];
    loading: boolean;
}

export default function UsersDisplay({ users, loading }: UserDisplayInterface) {
    if (loading){
        return <h2>Carregando...</h2>
    }

    const userCards = users.map((user: RandomUserData) => {
        return <Card
            name={`${user.name.first} ${user.name.last}`}
            username={user.login.username}
            email={user.email}
            image={user.picture.medium}
            gender={user.gender}
            age={user.registered.age}
            key={user.key} />
    })

    return (
        <div className="page_content--cards_listing">
            {userCards}
        </div>
    )
}