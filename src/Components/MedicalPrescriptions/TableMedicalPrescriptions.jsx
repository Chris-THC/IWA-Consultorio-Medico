import React, { useContext, useState } from "react";
import { ModalMedicalPrescriptions } from "./ModalMedicalPrescriptions";
import { GetTheAppContext } from "../../Context/AppContext";
import "../../Css/TableMedicalPrescriptions.css";
import { MdDeleteForever } from "react-icons/md";
import { BsPersonFillAdd, BsPencilFill } from "react-icons/bs";
import { LuFilterX } from "react-icons/lu";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const TableMedicalPrescriptions = ({ dataTable }) => {
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
    "nombre",
    "medico",
    "fecha",
    "medicamentos",
    "descripcion",
  ];

  const [searchByName, setSearchByName] = useState("");
  const [searchByDoctor, setSearchByDoctor] = useState("");
  const [searchByDate, setSearchByDate] = useState("");

  const handleClear = () => {
    setSearchByName("");
    setSearchByDoctor("");
    setSearchByDate("");
  };

  const filteredData = dataTable.filter((item) => {
    const nombreMatches = item.nombre
      .toLowerCase()
      .includes(searchByName.toLowerCase());

    const doctorMatches = item.medico
      .toLowerCase()
      .includes(searchByDoctor.toLowerCase());

    const dateMatches = item.fecha
      .toLowerCase()
      .includes(searchByDate.toLowerCase());

    return nombreMatches && doctorMatches && dateMatches;
  });

  return (
    <div className="container mt-5">
      <div className=" card mt-4 row ">
        <div className="card-header d-flex">
          <div className="col-8">
            <h2 className="card-title">Prescripciones Médicas</h2>
          </div>

          <div className="col-4 d-flex flex-row-reverse ">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-clear">Agregar</Tooltip>}
            >
              <Button
                id="btnAdd"
                className="ms-2 me-2 mb-1"
                variant="primary"
                onClick={() => {
                  handleShowModal();
                  setActionButtonModal("Agregar");
                }}
              >
                <BsPersonFillAdd size={18} />
              </Button>
            </OverlayTrigger>
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
                    <div className="col-md-3 mb-3">
                      <label>Paciente</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        value={searchByName}
                        onChange={(e) => {
                          setSearchByName(e.target.value);
                          setSearchByDoctor("");
                          setSearchByDate("");
                        }}
                        placeholder="Buscar por nombre..."
                        pattern="^[A-Za-z\s]+$"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label>Medico</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        value={searchByDoctor}
                        onChange={(e) => {
                          setSearchByDoctor(e.target.value);
                          setSearchByName("");
                          setSearchByDate("");
                        }}
                        placeholder="Buscar por nombre..."
                        pattern="^[A-Za-z\s]+$"
                      />
                    </div>
                    <div className="col-md-2 mb-3">
                      <label>Fecha</label>
                      <input
                        type="date"
                        className="form-control"
                        value={searchByDate}
                        onChange={(e) => {
                          setSearchByDate(e.target.value);
                          setSearchByName("");
                          setSearchByDoctor("");
                        }}
                        placeholder="Buscar por fecha de nacimiento..."
                      />
                    </div>

                    <div className="col-md-2 d-flex flex-row-reverse">
                      <div className="w-auto p-4">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-clear">Limpiar</Tooltip>
                          }
                        >
                          <button
                            id="iconoClear"
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleClear}
                          >
                            <LuFilterX color="white" />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table className="table table-bordered custom-table text-center">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Medico</th>
                  <th>Fecha de Asignación</th>
                  <th>Medicamentos Prescritos</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
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
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-clear">Editar</Tooltip>}
                      >
                        <Button
                          id="btnTables"
                          className="ms-2 me-2 mb-2 mt-2"
                          variant="primary"
                          onClick={() => {
                            handleShowModal();
                            setGetDataFromTable(item);
                            setActionButtonModal("Editar");
                          }}
                        >
                          <BsPencilFill className="btn-icon-lg" />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-clear">Eliminar</Tooltip>}
                      >
                        <Button
                          size={16}
                          id="btnTables"
                          className="ms-2 me-2 mb-2 mt-2"
                          variant="danger"
                          onClick={() => {
                            setTextAlert(`Se ha eliminado: ${item.nombre}`);
                            handleShowFloatAlter();
                          }}
                        >
                          <MdDeleteForever
                            size={13}
                            onClick={() => {}}
                            id="btnDeletePatient"
                            className="btn-icon-lg"
                          />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ModalMedicalPrescriptions
            show={showModal}
            handleClose={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};
