import { style } from "@vanilla-extract/css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivos } from "../../redux/actions/index";
import css from "../SearchBar/SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Activos() {
  const dispatch = useDispatch<any>();
  //const allactivos= useSelector((state)=>state.activos)
  const allactivos: any = useSelector<any>((state) => state.activos);

  const [currentPage, setCurrentPage] = useState(1); //--> porque empieza en pag 1 siempre
  const [activosPorPage, setActivosPorPage] = useState(9);
  //const indexLastActivo = currentPage * activosPorPage;
  //const indexFirstActivo = indexLastActivo - activosPorPage;
  const currentActivos = allactivos; //.slice(indexFirstActivo, indexLastActivo);
  const [orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(getActivos());
  }, [dispatch]);
  const navigate = useNavigate();
  return (
    <div>
      <SearchBar />
      <div className={css.maincontainer}>
        <table>
          <tbody>
            <tr>
              <td>Symbol</td>
              <td>Name</td>
              <td>Price</td>
              <td>Market Capitalization</td>
            </tr>

            {currentActivos.length > 0 ? (
              currentActivos.map((e: any) => {
                return (
                  <tr className={css.trespe}>
                    <td>
                      <img src={e.image} alt="" width="30px" height="30px" />
                    </td>
                    <td onClick={() => navigate(`/crypto/${e.id}`)}>
                      {e.name}
                    </td>
                    <td>${e.current_price}</td>
                    <td>{e.market_cap} USD$</td>
                  </tr>
                );
              })
            ) : (
              <img src="https://cdn.iconscout.com/icon/free/png-256/404-page-not-found-456876.png"></img>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activos;
