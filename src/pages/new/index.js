import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './style.css'
import api from '../../services/api';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCampany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    async function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        await api.post('spots', data, {
            headers: { user_id }
        })
        history.push('/dashboard')
        console.log('kkkk');
        
    }
    return (

        <form onSubmit={handleSubmit}>
            <label
                style={{ backgroundImage: `url(${preview})` }}
                id="thumbnail"
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} all="Select img" />
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input id="company"
                placeholder="Sua empresa incrivel"
                onChange={event => setCampany(event.target.value)}
                value={company}
            />
            <label htmlFor="company">TECNOLOGIAS* <span>(separadas por virgula)</span></label>
            <input id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="company">VALOR DA DIÁRIA* <span>(em branco para gratuita)</span></label>
            <input id="company"
                value={price}
                placeholder="Preco por dia"
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}