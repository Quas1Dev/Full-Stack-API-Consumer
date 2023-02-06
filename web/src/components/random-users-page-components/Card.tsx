export interface CardProps {
    name: string;
    email: string;
    image: string;
    username: string;
    age: Number;
    gender: string;
    key: string;
}

export default function Card({ name, email, image, username, age, gender, key }: CardProps) {
    // console.log("Gen:",gender)
    return (
        <div className={"card_listing--user_card " +
            (gender == "female" ?
            "user_card-female" :
            "user_card-male")}>

            <div className="user_card--user_image">

                <img src={image} alt="Foto do usuário." />

            </div>
            <div className="user_card--user_infos">
                <span className="user_infos--info">{"Nome: " + name}</span>
                <span className="user_infos--info">{"E-mail: " + email}</span>
                <span className="user_infos--info">{"Usuário: " + username}</span>
                <span className="user_infos--info">{"Idade: " + age}</span>
            </div>
        </div>
    )
}