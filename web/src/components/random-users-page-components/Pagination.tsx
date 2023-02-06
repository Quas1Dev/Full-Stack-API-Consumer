import { nanoid } from "nanoid";

interface PaginationInterface {
    usersPerPage: number;
    totalUsers: number;
    currentPage: number;
    setCurrentPage: Function;
}

export default function Pagination({ usersPerPage, totalUsers, currentPage, setCurrentPage }: PaginationInterface) {
    let pageNumbers = [];
    for (let i = 1; i <= (Math.ceil(totalUsers / usersPerPage)); i++) {
        pageNumbers.push(i);
    }

    const pageNumbersIcons = pageNumbers.map((number) => {
        return <div className={"pagination--index " +
            (currentPage == number ? "pagination--index_selected" : "")}
            onClick={()=> setCurrentPage(number)}
            key={nanoid()}></div>
    });

    return (
        <div className="post_listing--pagination">
            {pageNumbersIcons}
        </div>
    )
}