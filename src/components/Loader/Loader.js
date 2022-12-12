import { ColorRing } from 'react-loader-spinner';
import style from './Loader.module.css';

export const Loader = () => {
    return (
        <section className={style.Loader}>
            <ColorRing
                visible={true}
                height="300"
                width="300"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#0057b8', '#67acfc', '#c6e1ff', '#fae156', '#ffd700']}
            />
        </section>
    );
}

