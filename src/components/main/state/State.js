
import React, { useState, useEffect } from 'react'
import {createState, getState } from '../../../services/stateService';
import {Link} from 'react-router-dom';

export const State = () => {
  const [valueForm, setValueForm] = useState({});
  const [states, setStates] = useState([]);
  const { name = "", state = "" } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value })
  }
  const handleGetStates = async () => {
    try {
      const resp = await getState();
      setStates(resp.data)
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(() => {
      handleGetStates();
    }, []);



  

  const handleCreateState = async (e) => {
    e.preventDefault();
    try {
      const resp = await createState(valueForm);
      console.log(resp.data);;
      setValueForm({ name: "", state: "" });
      handleGetStates();

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCreateState(e)}>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input required name='name' value={name} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />

        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)}>
            <option defaultValue={""}>Seleccione</option>
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>

          </select>
        </div>

        <button className="btn btn-primary">Guardar</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creacion</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody >
          {
            states.map(state => {
              return <tr key={state._id}>
                <th  >{state.name}</th>
                <td>{state.state}</td>
                <td>{state.creationDate}</td>
                <td>{state.updateDate}</td>
                

                <td><Link to={`state/edit/${state._id}`}>
                        Editar
                      </Link></td>
                </tr>
        
      })
    }


              </tbody>
</table>


    </div>
  )
  
}
