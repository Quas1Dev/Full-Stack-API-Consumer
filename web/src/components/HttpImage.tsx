import Navigation from './global-components/Navigation';
import { ChangeEvent, useEffect, useState } from "react";
import isNumber from '../utils/isnumber';
import checkHttp from '../utils/checkhttp';

export default function HttpImage() {
    // The code we want an image for
    const [pickedCode, setPickedCode] = useState<string>();
    // The address for the image that should be loaded
    const [url, setUrl] = useState<string>("");

    // If is a number, we set picked code
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        if (isNumber(value) || value == "") {
            setPickedCode(value);
        }
    }

    // Load random cat or set 'default' image.
    useEffect(() => {
        const result: boolean = checkHttp(Number(pickedCode));
        if (result) {
            setUrl("https://http.cat/" + pickedCode)
        } else {
            setUrl("https://i.postimg.cc/k5Rh8k8H/404.jpg");
        }
    }, [pickedCode])

    return (
        <div className="page_container--http_image_page">
            <Navigation />
            <main className="http_image_page--main_conent u-page_body">

                <h1 className="main_content--http_image_page_title u-title">Gerador de imagem HTTP</h1>

                <p className="page_content--page_description u-description">
                    A imagem abaixo foi fornecida pela API HTTP Cat, que retorna a imagem de um gato associada ao código HTTP escolhido. Digite um código no campo abaixo para
                    receber outra imagem.
                </p>

                <form action="#" className="page_conent--image_form">
                    <label htmlFor="http_code_number" className="">Digite um código:  </label>
                    <input type="text"
                        name="http_code_picker"
                        id="http_code_number"
                        value={pickedCode}
                        onChange={handleChange}
                        className="random_http_image_page--http_code_picker"
                        placeholder='Ex: 500' />
                </form>

                <div className="u-image_centralizer">
                    <img src={url} alt="" className="random_http_image_page--http_image" />
                </div>
            </main>
        </div>
    )
}