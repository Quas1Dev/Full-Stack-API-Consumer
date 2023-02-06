export default function checkHttp (httpCode: number) :boolean {
    if (httpCode >= 100 && httpCode <= 103 ||
        httpCode >= 200 && httpCode <= 204 || 
        httpCode == 206 || httpCode == 207 || 
        httpCode >= 300 && httpCode <= 305 ||
        httpCode == 307 || httpCode == 308 ||
        httpCode >= 400 && httpCode <= 418 ||
        httpCode >= 420 && httpCode <= 426 || 
        httpCode == 429 || httpCode == 431 ||
        httpCode == 444 || httpCode == 450 ||
        httpCode == 451 || 
        httpCode >= 497 && httpCode <= 504 ||
        httpCode >= 506 && httpCode <= 511 ||
        httpCode >= 521 && httpCode <= 523 ||
        httpCode == 525 || httpCode == 599) {
            return true
        }  else {
            return false
        }
}