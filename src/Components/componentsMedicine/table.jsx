import React, {useState, useContext} from 'react';
import '../../Css/CssTable.css';

import { GetTheAppContext } from "../../Context/AppContext";
import { ModalMedicine } from './modal';
import { MyModalDelete } from './modalDelete';
import { BsPersonFillAdd } from "react-icons/bs";
import { MdChangeCircle, MdDeleteForever } from 'react-icons/md';
import { Button } from "react-bootstrap";

/*
como nombre, dosis, forma de presentación y descripción.
*/

export function TablaGeneric({ title, data, headers }) {

  const [showModalDelete, setShowModalDelete] = useState(false);
  // const[id, setid] = useState(null);
  const handleShowModalDelete = () => {
    setShowModalDelete(true);
    // setid(Id);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };
  
  const {
    handleShowModal,
    handleCloseModal,
    showModal,
    setGetDataFromTable,
    setActionButtonModal,
    handleShowFloatAlter,
    setTextAlert,
  } = useContext(GetTheAppContext);

  const displayedFields = [
    "name",
    "dosis",
    "presentation",
    "description",
  ];
  

  const [searchName, setSearchName] = useState("");
  const [searchDosis, setSearchDosis] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

  const handleClear = () => {
    setSearchName("");
    setSearchDosis("");
    setSearchDescription("");
  };

  const filteredData = data.filter((item) => {
    const nombreMatches = item.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const dosisMatches = item.dosis.includes(searchDosis);

    const descriptionMatches = item.description
      .toLowerCase()
      .includes(searchDescription.toLowerCase());

    return nombreMatches && dosisMatches && descriptionMatches;
  });
  return (
    <div className="container mt-5">
      <div className=" card mt-4 row">
        <div className="card-header d-flex">
          <div className="col-8">
            <h2 className="card-title">Medicina</h2>
          </div>

          <div className="col-4 d-flex flex-row-reverse ">
          <Button
              id="btnAdd"
              className="ms-2 me-2 mb-1"
              variant="primary"
              onClick={() => {
                handleShowModal();
                setActionButtonModal("Agregar");
              }}
            >
              <BsPersonFillAdd /> Agregar
            </Button>
          </div>
        </div>

        <div className="card-header col-md-12">
          <div className=" card-body table-responsive">
            <div className="container mb-3">
              <div className="col-md-4 mb-3">
                <h4>Buscar</h4>
              </div>
              <div className="row">
                <div className="container mb-3">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label>Nombre</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        value={searchName}
                        onChange={(e) => {
                          setSearchName(e.target.value);
                          setSearchDosis("");
                          setSearchDescription("");
                        }}
                        placeholder="Buscar por nombre..."
                        pattern="^[A-Za-z\s]+$"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>Dosis</label>
                      <input
                        type="number"
                        className="form-control"
                        value={searchDosis}
                        onChange={(e) => {
                          setSearchDosis(e.target.value);
                          setSearchName("");
                          setSearchDescription("");
                        }}
                        placeholder="Buscar por dosis..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>Descripción</label>
                      <input
                        type="text"
                        className="form-control"
                        value={searchDescription}
                        onChange={(e) => {
                          setSearchDescription(e.target.value);
                          setSearchName("");
                          setSearchDosis("");
                        }}
                        placeholder="Buscar por descripción..."
                      />
                    </div>
                    
                    <div className="col-md-12 d-flex flex-row-reverse ">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={handleClear}
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-bordered custom-table text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dosis</th>
                  <th>Presentación</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    {displayedFields.map((field) => (
                      <td key={field}>
                        <div id="idTextPatient" className="d-inline">
                          {item[field]}
                        </div>
                      </td>
                    ))}
                    <td className='Buttons'>
                    <Button
                        id="btnTables"
                        className="ms-2 me-2 mb-1"
                        variant="primary"
                        onClick={() => {
                          handleShowModal();
                          setGetDataFromTable(item);
                          setActionButtonModal("Editar");
                        }}
                      >
                        <MdChangeCircle className="btn-icon-lg" /> Editar
                      </Button>
                    <Button
                        id="btnTables"
                        className="ms-2 me-2 mb-1 d-inline"
                        variant="danger"
                        onClick={() => {
                          console.log(item.nombre);
                          
                          handleShowModalDelete()
                        }}
                      >
                        <MdDeleteForever
                          id="btnDeletePatient"
                          className="btn-icon-lg"
                        />{" "}
                        Eliminar
                      </Button>
                      
    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ModalMedicine show={showModal} handleClose={handleCloseModal} />
          <MyModalDelete show={showModalDelete} handleClose={handleCloseModalDelete}  />
        </div>
      </div>
    </div>
  
  );
}


{/* <td className='Buttons'>
      <Button type='Editar' onClick={() => {
        handleShowModal();
        setGetDataFromTable(item);
        setActionButtonModal("Editar");
      }} />
      
      <Button type='Eliminar' onClick={() => handleShowModalDelete()}/>
      {/*Id={item.id}} 
      <MyModalDelete show={showModalDelete} handleClose={handleCloseModalDelete}  />
    </td> */}

// export function TablaGenerica({ title, data, headers }) {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const handleButtonClick = (patient) => {
//     setSelectedPatient(patient);
//     setShowModal(true);
//   };

//   return (
//     <div className='container-doctors'>
//       <div className='title-doctors'>
//         <h1 className='title-doctores'>{title}</h1>
//         <Button tipo='Agregar' onClick={() => handleButtonClick(item)} />
//       </div>
//       <div className='table-doctors-container'>
//         <table>
//           <thead>
//           <tr>
//               {headers.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//               <th>Acción</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//               {Object.keys(item).map((key) => (
//                 key !== 'id' && <td key={key}>{item[key]}</td>
//               ))}
//                 <td>
//                   <Button tipo='Editar' onClick={() => handleButtonClick(item)} />
//                   <Button tipo='Eliminar' onClick={() => handleButtonClick(item)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showModal && <CreatePatient show={showModal} handleClose={() => setShowModal(false)} patient={selectedPatient} />}
//     </div>
//   );
// }


  // <div className='container-doctors'>
    //   <div className='title-doctors'>
    //     <h1 className='title-doctores'>{title}</h1>
    //     <Button tipo='Agregar' onClick={handleShowModal} />
    //     <MyModal show={showModal} handleClose={handleCloseModal} />
    //   </div>
    //   <div className='table-doctors-container'>
    //     <table>
    //       <thead>
    //         <tr>
    //           {headers.map((header, index) => (
    //             <th key={index}>{header}</th>
    //           ))}
    //           <th>Acción</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((item, index) => (
    //           <tr key={index}>
    //             {Object.keys(item).map((key) => (
    //               key !== 'id' && <td key={key}>{item[key]}</td>
    //             ))}
                
    //               <td>
    //                   <Button tipo='Editar' /> 
    //                   <Button tipo='Eliminar' /> 
    //               </td>
               
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>