import { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './global-components/Navigation';
import { MouseEvent, MouseEventHandler } from 'react';

export default function RandomDog() {
    const [image, setImage] = useState()

    const fetchDog = async () => {
        const response = await axios.get("https://random.dog/woof/?include=jpg");
        console.log(response.data)
        setImage(response.data)
    }

    useEffect(() => {
        fetchDog();
    }, [])

    function handleClick(e: MouseEvent) {
        fetchDog();
    }

    return (
        <div className="page_container--random_dog_page">
            <Navigation />
            <main className='random_dog_page--main_content u-page_body'>
                <h1 className="main_content--random_dog_page_title u-title">Cachorro aleatório</h1>
                <p className='page_content--page_description u-description'>A imagem abaixo foi escolhida aleatoriamente e fornecida pela API Random Dog. Atualise a página para buscar outra imagem  apertando o botão abaixo
                    ou o botão do navegador.</p>
                <button className="main_content--refresh" onClick={handleClick}>Recarregar</button>
                <div className='main_content--image_centralizer'>
                    <img src={"https://random.dog/" + image} className="random_dog_page--image" alt="Imagem aleatória de cachorro ou cachorros gerada pela API Random Dogs." />
                </div>

            </main>


        </div>
    )
}