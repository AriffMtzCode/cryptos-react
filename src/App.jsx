import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { Quote } from "./components/Quote";
import { Spiner } from "./components/Spiner";
import ImageCrypto from "./img/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

export const App = () => {
  const [monedas, setMonedas] = useState({});
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setIsLoading(true);
        setQuote({});
        const { moneda, crypto } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;
        const resp = await fetch(url);
        const data = await resp.json();
        setQuote(data.DISPLAY[crypto][moneda]);

        setIsLoading(false);
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Container>
      <Image src={ImageCrypto} alt="image crypto" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form setMonedas={setMonedas} />
        {isLoading && <Spiner />}
        {quote.PRICE && <Quote quote={quote} />}
      </div>
    </Container>
  );
};
