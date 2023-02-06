import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios";
import { nanoid } from "nanoid";

import Navigation from './global-components/Navigation'
import UsersDisplay from "./random-users-page-components/UsersDisplay";
import Pagination from "./random-users-page-components/Pagination";
import SearchBox from "./random-users-page-components/SearchBox";
import { RandomUserData, RandomUserApiResponse } from "../interfaces/RandomUsersInterfaces";

export default function RandomUser() {
    const [randomUsers, setRandomUsers] = useState<RandomUserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchList, setSearchList] = useState<RandomUserData[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(8);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const response = await axios.get<RandomUserApiResponse>("https://randomuser.me/api/?results=40");
            setLoading(false);

            setRandomUsers(response.data.results.map(user => {
                user.key = nanoid();
                return user;
            }))
        }
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = searchList.length == 0 ?
        randomUsers.slice(indexOfFirstUser, indexOfLastUser) :
        searchList.slice(indexOfFirstUser, indexOfLastUser);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        // We filter only the users that match the value 
        // typed by the user.
        setSearchList(randomUsers.filter((randomUser) => {
            let lowerCaseValue = value.toLocaleLowerCase()
            if (`${randomUser.name.first} ${randomUser.name.last}`.toLowerCase().match(lowerCaseValue) ||
                randomUser.email.toLowerCase().match(lowerCaseValue) ||
                randomUser.login.username.toLowerCase().match(lowerCaseValue)) {
                return randomUser;
            }
        }))

        setSearchInput(value);
    }

    return (
        <div className="page_container--random_user_page">
            <Navigation />

            <main className="random_user_page--main_content u-page_body">
                <h1 className="main_content--random_user_page u-title">Lista de Usuários</h1>
                <p className="page_content--page_descriptio u-description">As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>

                <SearchBox handleChange={handleChange} searchInput={searchInput} />

                <UsersDisplay users={currentUsers} loading={loading} />

                <Pagination totalUsers={searchList.length == 0 ? randomUsers.length : searchList.length} usersPerPage={usersPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </main>
        </div>
    )
}