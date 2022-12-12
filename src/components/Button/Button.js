import PropTypes from 'prop-types';
import style from './Buton.module.css';

export const Button = ({onClick}) => {
    return (
        <div className={style.Button_placing}>
            <button className={style.Button} type="button" onClick={onClick}>
                Load more
            </button>
        </div>
    );
}

Button.propTyper = {
  onClick: PropTypes.func,
}