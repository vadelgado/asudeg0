import { useRef, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormField from "@/Components/FormField";
import SelectField from "@/Components/SelectField";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import ImgField from "@/Components/ImgField";
import SecondaryButton from "@/Components/SecondaryButton";
import WarningButton from "@/Components/WarningButton";
import Footer from "@/Components/DashBoard/Footer";

export default function Index({
    auth,
    equipo_id,
    jugadores,
    equipo,
    userRole,
}) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [disclaimerChecked, setDisclaimerChecked] = useState(false);

    const nombreCompletoInput = useRef();
    const fotoInput = useRef();
    const tipoIdentificacionInput = useRef();
    const numeroIdentificacionInput = useRef();
    const numeroSerieInput = useRef();
    const fechaNacimientoInput = useRef();
    const lugarNacimientoInput = useRef();
    const institucionEducativaInput = useRef();
    const gradoInput = useRef();
    const ciudadInstitucionEducativaInput = useRef();
    const telefonoInstitucionEducativaInput = useRef();
    const estadoEPSInput = useRef();
    const nombreEPSInput = useRef();
    const cuerpoTecnicoInput = useRef();
    const lugarAtencionEPSInput = useRef();

    const InitialValues = {
        id: "",
        nombreCompleto: "",
        foto: null,
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        numeroSerie: "",
        fechaNacimiento: "",
        lugarNacimiento: "",
        institucionEducativa: "",
        grado: "",
        ciudadInstitucionEducativa: "",
        telefonoInstitucionEducativa: "",
        fk_equipo: equipo_id,
        estadoEPS: "",
        nombreEPS: "",
        lugarAtencionEPS: "",
        cuerpoTecnico: "",
    };
    const paginationComponentOptions = {
        rowsPerPageText: "Registros por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const {
        data,
        setData,
        errors,
        delete: destroy,
        post,
        processing,
    } = useForm(InitialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleInputChangeMayus = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };

    const handleFileChange = (e) => {
        setData("foto", e.target.files[0]);
    };

    const handleInputChangeFirst = (event) => {
        const { name, value } = event.target;
        const valueWithCapitalLetters = value
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        setData((prevData) => ({
            ...prevData,
            [name]: valueWithCapitalLetters,
        }));
    };

    const openModal = (
        op,
        id,
        nombreCompleto,
        foto,
        tipoIdentificacion,
        numeroIdentificacion,
        numeroSerie,
        fechaNacimiento,
        lugarNacimiento,
        institucionEducativa,
        grado,
        ciudadInstitucionEducativa,
        telefonoInstitucionEducativa,
        fk_equipo,
        estadoEPS,
        nombreEPS,
        lugarAtencionEPS,
        cuerpoTecnico
    ) => {
        setModal(true);
        setOperation(op);

        if (op === 1) {
            setTitle("Nuevo Miembro del Equipo");
            setData(InitialValues);
        } else {
            setTitle("Editar Miembro del Equipo");
            setData({
                id: id,
                nombreCompleto: nombreCompleto,
                foto: foto,
                tipoIdentificacion: tipoIdentificacion,
                numeroIdentificacion: numeroIdentificacion,
                numeroSerie: numeroSerie,
                fechaNacimiento: fechaNacimiento,
                lugarNacimiento: lugarNacimiento,
                institucionEducativa: institucionEducativa,
                grado: grado,
                ciudadInstitucionEducativa: ciudadInstitucionEducativa,
                telefonoInstitucionEducativa: telefonoInstitucionEducativa,
                fk_equipo: fk_equipo,
                estadoEPS: estadoEPS,
                nombreEPS: nombreEPS,
                lugarAtencionEPS: lugarAtencionEPS,
                cuerpoTecnico: cuerpoTecnico,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const save = (e) => {
        e.preventDefault();
        if (disclaimerChecked) {
            if (operation === 1) {
                post(
                    userRole === "admin"
                        ? route("jugadoresAdmin.store")
                        : route("jugadores.store"),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            ok("El Miembro del Equipo ha sido creado");
                        },
                    }
                );
            } else {
                post(
                    userRole === "admin"
                        ? route("jugadoresAdmin.updatepost", data.id)
                        : route("jugadores.updatepost", data.id),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            ok("El Miembro del Equipo ha sido actualizado");
                        },
                    }
                );
            }
        } else {
            alert(
                "Debe aceptar la exoneración de responsabilidades para guardar."
            );
        }
    };

    const handleDisclaimerChange = (e) => {
        setDisclaimerChecked(e.target.checked);
    };

    const ok = (mensaje) => {
        closeModal();
        Swal.fire({ title: mensaje, icon: "success" });
    };

    const toggleJugador = (id, nombreJugador) => {
        Swal.fire({
            title: "Activar/Desactivar",
            text: `¿Está seguro cambiar el estado del Miembro del Equipo ${nombreJugador}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                post(
                    userRole === "admin"
                        ? route("jugadoresAdmin.toggle", id)
                        : route("jugadores.toggle", id),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            ok("El Miembro del Equipo ha sido actualizado");
                        },
                        onError: () => {
                            Swal.fire({
                                title: "Error",
                                text: "El Miembro del Equipo no ha sido actualizado",
                                icon: "error",
                            });
                        },
                    }
                );
            }
        });
    };

    const eliminar = (id, nombreJugador) => {
        Swal.fire({
            title: "Eliminar Miembro del Equipo",
            text: `¿Está seguro de eliminar al Miembro del Equipo ${nombreJugador}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("jugadores.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        ok("El Miembro del Equipo ha sido eliminado");
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "El Miembro del Equipo no ha sido eliminado",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    const handletipoDocIdentidad = [
        { value: "", label: "Seleccione ...", disabled: true },
        { value: "CC", label: "Cédula de Ciudadanía" },
        { value: "CE", label: "Cédula de Extranjería" },
        { value: "TI", label: "Tarjeta de Identidad" },
        { value: "RC", label: "Registro Civil" },
        { value: "PA", label: "Pasaporte" },
    ];

    const handlecuerpoTecnico = [
        { value: "", label: "Seleccione ...", disabled: true },
        { value: "D.L.", label: "Delegado o Director Logístico" },
        { value: "D.T.", label: "Director Técnico (Entrenador Principal)" },
        { value: "A.T.", label: "Asistente Técnico" },
        { value: "P.F.", label: "Preparador Físico" },
        { value: "P.S.", label: "Preparador Salud" },
        { value: "U.T.", label: "Utilero" },
        { value: "T.N.", label: "Tribuna" },
    ];

    const filteredJugadores = jugadores.filter(
        (jugador) =>
            jugador.nombreCompleto &&
            jugador.nombreCompleto
                .toLowerCase()
                .includes(filterText.toLowerCase())
    );

    const columns = [
        { name: "N°", selector: (row, index) => index + 1, sortable: true },
        {
            name: "NOMBRES Y APELLIDOS",
            selector: (row) => row.nombreCompleto,
            sortable: true,
        },
        {
            name: "TIPO DOC",
            selector: (row) => row.tipoIdentificacion,
            sortable: true,
        },
        {
            name: "# DOC",
            selector: (row) => row.numeroIdentificacion,
            sortable: true,
        },
        {
            name: "SERIAL FOLIO",
            selector: (row) => row.numeroSerie,
            sortable: true,
        },
        {
            name: "FECHA NACIMIENTO",
            selector: (row) => row.fechaNacimiento,
            sortable: true,
        },
        {
            name: "LUGAR NACIMIENTO",
            selector: (row) => row.lugarNacimiento,
            sortable: true,
        },
        {
            name: "INSTITUCIÓN EDUCATIVA",
            selector: (row) => row.institucionEducativa,
            sortable: true,
        },
        { name: "GRADO", selector: (row) => row.grado, sortable: true },
        {
            name: "CIUDAD",
            selector: (row) => row.ciudadInstitucionEducativa,
            sortable: true,
        },
        {
            name: "TELÉFONO INSTITUCIONAL",
            selector: (row) => row.telefonoInstitucionEducativa,
            sortable: true,
        },
        {
            name: "Cuerpo Técnico",
            selector: (row) => row.cuerpoTecnico,
            sortable: true,
        },

        {
            name: "EDITAR",
            cell: (row) => (
                <WarningButton
                    onClick={() =>
                        openModal(
                            2,
                            row.id,
                            row.nombreCompleto,
                            row.foto,
                            row.tipoIdentificacion,
                            row.numeroIdentificacion,
                            row.numeroSerie,
                            row.fechaNacimiento,
                            row.lugarNacimiento,
                            row.institucionEducativa,
                            row.grado,
                            row.ciudadInstitucionEducativa,
                            row.telefonoInstitucionEducativa,
                            row.fk_equipo,
                            row.estadoEPS,
                            row.nombreEPS,
                            row.lugarAtencionEPS,
                            row.cuerpoTecnico
                        )
                    }
                >
                    <i className="fa-solid fa-pencil"></i>
                </WarningButton>
            ),
        },
        {
            name: "ESTADO",
            cell: (row) => (
                <SecondaryButton
                    onClick={() => toggleJugador(row.id, row.nombreCompleto)}
                >
                    <i className="fa-solid fa-eye"></i>
                    {row.estado === 1 ? "Off" : "On"}
                </SecondaryButton>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ⚽ Miembros del Equipo 👦👧
                </h2>
            }
        >
            <Head title="⚽ Miembros del Equipo 👦👧" />
            <div className="flex flex-col min-h-screen">
                <main className="container flex-grow px-4 py-8 mx-auto mt-32">
                    <div className="py-6">
                        <div className="container p-6 mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
                            <div className="flex justify-end mt-1 mb-4 space-x-4">
                                <PrimaryButton onClick={() => openModal(1)}>
                                    <i className="mr-2 fa-solid fa-plus-circle"></i>
                                    Agregar Miembro del Equipo
                                </PrimaryButton>
                                <PrimaryButton>
                                    <a
                                        href={route("jugadores.pdf", {
                                            equipo_id,
                                        })}
                                        target="_blank"
                                        download
                                    >
                                        <i className="mr-2 fa-solid fa-file-pdf"></i>
                                        Descargar PDF
                                    </a>
                                </PrimaryButton>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre del Miembro del Equipo"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={filterText}
                                    onChange={(e) =>
                                        setFilterText(e.target.value)
                                    }
                                />
                            </div>

                            <div className="mt-2 text-left">
                                <span className="italic font-bold">
                                    NOMBRE EQUIPO:{" "}
                                </span>
                                <span>{equipo}</span>
                            </div>

                            <DataTable
                                title="Listado de Miembro del Equipo"
                                columns={columns}
                                data={filteredJugadores}
                                pagination
                                paginationComponentOptions={
                                    paginationComponentOptions
                                }
                                highlightOnHover
                                responsive
                                striped
                                fixedHeader
                                noDataComponent={
                                    <div>
                                        No hay Miembro del Equipo Registrados
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    <Modal show={modal} close={closeModal}>
                        <h2 className="p-4 text-2xl font-semibold text-white bg-gray-800 border-b border-gray-300 rounded-t-md">
                            {title}
                        </h2>
                        <form
                            onSubmit={save}
                            className="grid grid-cols-2 gap-4 p-6"
                            encType="multipart/form-data"
                        >
                            <FormField
                                htmlFor="nombreCompleto"
                                label={
                                    <>
                                        <span>Nombres y Apellidos</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="nombreCompleto"
                                type="text"
                                name="nombreCompleto"
                                value={data.nombreCompleto}
                                onChange={handleInputChangeMayus}
                                errorMessage={errors.nombreCompleto}
                                ref={nombreCompletoInput}
                            />
                            <ImgField
                                htmlFor="foto"
                                label={
                                    <>
                                        <span>Foto</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="foto"
                                name="foto"
                                ref={fotoInput}
                                onChange={handleFileChange}
                                value={data.foto}
                                errorMessage={errors.foto}
                                imageUrl={
                                    data.foto
                                        ? `http://127.0.0.1:8000/storage/${data.foto}`
                                        : null
                                }
                            />
                            <SelectField
                                htmlFor="cuerpoTecnico"
                                label={
                                    <>
                                        <span>Forma Parte del Cuerpo técnico</span>
                                    </>
                                }
                                id="cuerpoTecnico"
                                name="cuerpoTecnico"
                                value={data.cuerpoTecnico}
                                options={handlecuerpoTecnico}
                                onChange={handleInputChange}
                                errorMessage={errors.cuerpoTecnico}
                                ref={cuerpoTecnicoInput}
                            />
                            <SelectField
                                htmlFor="tipoIdentificacion"
                                label={
                                    <>
                                        <span>Tipo Documento Identidad</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={data.tipoIdentificacion}
                                options={handletipoDocIdentidad}
                                onChange={handleInputChange}
                                errorMessage={errors.tipoIdentificacion}
                                ref={tipoIdentificacionInput}
                            />
                            <FormField
                                htmlFor="numeroIdentificacion"
                                label={
                                    <>
                                        <span>Número Documento Identidad</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="numeroIdentificacion"
                                type="number"
                                name="numeroIdentificacion"
                                value={data.numeroIdentificacion}
                                onChange={handleInputChange}
                                errorMessage={errors.numeroIdentificacion}
                                ref={numeroIdentificacionInput}
                            />
                            <FormField
                                htmlFor="numeroSerie"
                                label={
                                    <>
                                        <span>
                                            Registro Civil #SERIAL FOLIO si es
                                            Jugado
                                        </span>
                                    </>
                                }
                                id="numeroSerie"
                                type="number"
                                name="numeroSerie"
                                value={data.numeroSerie}
                                onChange={handleInputChange}
                                errorMessage={errors.numeroSerie}
                                ref={numeroSerieInput}
                            />
                            <FormField
                                htmlFor="fechaNacimiento"
                                label={
                                    <>
                                        <span>Fecha Nacimiento</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="fechaNacimiento"
                                type="date"
                                name="fechaNacimiento"
                                value={data.fechaNacimiento}
                                onChange={handleInputChange}
                                errorMessage={errors.fechaNacimiento}
                                ref={fechaNacimientoInput}
                            />
                            <FormField
                                htmlFor="lugarNacimiento"
                                label={
                                    <>
                                        <span>Lugar Nacimiento</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="lugarNacimiento"
                                type="text"
                                name="lugarNacimiento"
                                value={data.lugarNacimiento}
                                onChange={handleInputChangeFirst}
                                errorMessage={errors.lugarNacimiento}
                                ref={lugarNacimientoInput}
                            />
                            <FormField
                                htmlFor="institucionEducativa"
                                label={
                                    <>
                                        <span>Institución Educativa</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="institucionEducativa"
                                type="text"
                                name="institucionEducativa"
                                value={data.institucionEducativa}
                                onChange={handleInputChangeFirst}
                                errorMessage={errors.institucionEducativa}
                                ref={institucionEducativaInput}
                            />
                            <FormField
                                htmlFor="grado"
                                label={
                                    <>
                                        <span>
                                            Grado de Estudio Actual o Máximo
                                        </span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="grado"
                                type="text"
                                name="grado"
                                value={data.grado}
                                onChange={handleInputChange}
                                errorMessage={errors.grado}
                                ref={gradoInput}
                            />

                            <FormField
                                htmlFor="ciudadInstitucionEducativa"
                                label={
                                    <>
                                        <span>
                                            Ciudad Institución Educativa
                                        </span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="ciudadInstitucionEducativa"
                                type="text"
                                name="ciudadInstitucionEducativa"
                                value={data.ciudadInstitucionEducativa}
                                onChange={handleInputChangeFirst}
                                errorMessage={errors.ciudadInstitucionEducativa}
                                ref={ciudadInstitucionEducativaInput}
                            />
                            <FormField
                                htmlFor="telefonoInstitucionEducativa"
                                label={
                                    <>
                                        <span>
                                            Teléfono Institución Educativa
                                        </span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="telefonoInstitucionEducativa"
                                type="number"
                                name="telefonoInstitucionEducativa"
                                value={data.telefonoInstitucionEducativa}
                                onChange={handleInputChange}
                                errorMessage={
                                    errors.telefonoInstitucionEducativa
                                }
                                ref={telefonoInstitucionEducativaInput}
                            />
                            <SelectField
                                htmlFor="estadoEPS"
                                label={
                                    <>
                                        <span>Estado EPS</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="estadoEPS"
                                name="estadoEPS"
                                value={data.estadoEPS}
                                options={[
                                    {
                                        value: "",
                                        label: "Seleccione ...",
                                        disabled: true,
                                    },
                                    { value: 1, label: "Activo" },
                                    { value: 0, label: "Inactivo" },
                                ]}
                                onChange={handleInputChange}
                                errorMessage={errors.estadoEPS}
                                ref={estadoEPSInput}
                            />
                            <FormField
                                htmlFor="nombreEPS"
                                label={
                                    <>
                                        <span>Nombre EPS</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="nombreEPS"
                                type="text"
                                name="nombreEPS"
                                value={data.nombreEPS}
                                onChange={handleInputChangeFirst}
                                errorMessage={errors.nombreEPS}
                                ref={nombreEPSInput}
                            />
                            <FormField
                                htmlFor="lugarAtencionEPS"
                                label={
                                    <>
                                        <span>lugar Atención EPS</span>
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                id="lugarAtencionEPS"
                                type="text"
                                name="lugarAtencionEPS"
                                value={data.lugarAtencionEPS}
                                onChange={handleInputChangeFirst}
                                errorMessage={errors.lugarAtencionEPS}
                                ref={lugarAtencionEPSInput}
                            />

                            <div className="flex items-center col-span-2">
                                <input
                                    type="checkbox"
                                    id="disclaimer"
                                    name="disclaimer"
                                    onChange={handleDisclaimerChange}
                                    checked={disclaimerChecked}
                                />
                                <label htmlFor="disclaimer" className="ml-2">
                                    <span className="text-red-500">*</span>
                                    Acepto la exoneración de responsabilidades
                                    <a
                                        href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Ley 1581 de 2012 de Protección de Datos
                                        Personales
                                    </a>
                                    . Al aceptar, reconozco que autorizo a
                                    Alianza Sureña Grupo Empresarial para
                                    utilizar los datos personales de los Miembro
                                    del Equipo exclusivamente para la gestión y
                                    organización de torneos de fútbol. La
                                    información recopilada incluye datos
                                    detallados como nombre completo, foto, tipo
                                    y número de identificación, fecha y lugar de
                                    nacimiento, entre otros. Estos datos serán
                                    tratados de manera confidencial y solo se
                                    usarán para verificar la elegibilidad de los
                                    jugadores, organizar eventos y mantener
                                    comunicación con los representantes legales
                                    sobre actividades relacionadas con el
                                    torneo. Los titulares de los datos pueden
                                    ejercer sus derechos de acceso,
                                    rectificación y actualización contactando a
                                    través de CIMA_FUTURASESTRELLAS@hotmail.com
                                    o llamando al +57 318 3773718.
                                </label>
                            </div>

                            <div className="flex justify-between col-span-2 mt-1">
                                <PrimaryButton
                                    processing={processing.toString()}
                                    className="mt-2"
                                    disabled={!disclaimerChecked}
                                >
                                    <i className="mr-2 fa-solid fa-save"></i>
                                    Guardar
                                </PrimaryButton>
                                <SecondaryButton onClick={closeModal}>
                                    Cancelar
                                </SecondaryButton>
                            </div>
                        </form>
                    </Modal>
                </main>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}
