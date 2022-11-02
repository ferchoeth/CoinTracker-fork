import style from './SwapModal.module.css';
import { useEffect, useState } from 'react';
import { getActivos } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const SwapModal = ({ modalState, setModalState, coin }) => {
  const dispatch = useDispatch<any>();
  const allActives: any = useSelector<any>((state) => state.activos);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!allActives.length) {
      dispatch(getActivos());
    }
  }, [dispatch]);

  const filteredActives = () => {
    if (searchValue) {
      return allActives.filter((active) =>
        active.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return allActives;
  };

  const handleClick = () => {
    setModalState({ ...modalState, show: !modalState.show });
    setSearchValue('');
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      {modalState.show && (
        <div onClick={handleClick} className={style.overlay}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={style['modal-container']}
          >
            <div className={style.header}>
              <h4>Select a coin</h4>
              <button onClick={handleClick}>X</button>
            </div>
            <input
              onChange={handleChange}
              type='text'
              placeholder='Search Name'
              value={searchValue}
            />

            <div className={style['coins-container']}>
              {filteredActives().map((active) => {
                return (
                  <div
                    key={active.name}
                    className={style.coin}
                    onClick={() => {
                      setModalState({
                        ...modalState,
                        data: active,
                        show: !modalState.show,
                      });
                      setSearchValue('');
                    }}
                  >
                    <img
                      src={active.image}
                      alt={active.name}
                      width='30px'
                      height='30px'
                    />
                    <p>{active.name}</p>
                    <p>{active.symbol.toUpperCase()}</p>
                    <p>{active.current_price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
