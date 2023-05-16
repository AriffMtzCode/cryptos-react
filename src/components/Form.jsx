import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { monedas } from "../data/monedas";
import { useSelectCrypto } from "../hooks/useSelectCrypto";
import { Error } from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

export const Form = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectCrypto("Elige tu Moneda", monedas);
  const [crypto, SelectCrypto] = useSelectCrypto(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const getApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resp = await fetch(url);
      const data = await resp.json();

      const arrayCryptos = data.Data.map((crypto) => {
        const objeto = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return objeto;
      });
      setCriptos(arrayCryptos);
    };

    getApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, crypto].includes("")) {
      setError(true);

      return;
    }

    setError(false)
    setMonedas({
      moneda,
      crypto
    })
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCrypto />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};
