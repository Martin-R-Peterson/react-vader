import './History.scss';

export  function History({rows}){


    return (
   <>
    <div className="ok">Senast sökta platser</div>
    <table>
        <tbody>
        <tr>
            <th>Plats</th>
            <th>Temp</th>
        </tr>
        {rows.map((row,index) => {
            return (
            <tr key={index}>
            <td>{row.name}</td>
            <td>{Math.round(row.temp)}°C</td>
        </tr>)
        })}
        
        </tbody>
        </table>
    </>
)

}

