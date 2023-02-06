import { ChangeEventHandler } from "react";

interface SearchBoxInterface {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    searchInput: string;
}

export default function SearchBox({ handleChange, searchInput }: SearchBoxInterface) {
    return (
        <form action="#">
            <input className="page_content--search_box"
                placeholder="Ex: Claudia"
                type="text"
                value={searchInput}
                onChange={handleChange} />
        </form>
    )
}