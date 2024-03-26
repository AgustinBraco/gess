import { Link } from "react-router-dom";

const Inicio = () => {
    return (
        <>
            <div className="Cont-Uno">
                <h4>Gestoria de tramites</h4>
                <h1>Soluciones rapidas y eficientes a <b>tu alcance</b></h1>
                <h3><b>Nuestro objetivo</b> es resolver problemas y proporcionar soluciones rapidas en situaciones complicadas y apremiantes</h3>
                <Link className="Link"> <b>Ingresar {`>`} </b></Link>
            </div>
            <img src="" alt="logo" />
            <div className="Cont">
                <h2>¿Quienes somos?</h2>
                <div>
                    <h4>Gestoria de tramites</h4>
                    <h5>En los últimos años hemos resuelto gran cantidad de requerimientos realizados desde el exterior, con notable eficacia y rapidez, de personas que obtuvieron información en consulados argentinos; ya que somos la única empresa argentina que asegura cobertura en todo el territorio nacional, con la máxima trayectoria y seguridad. Nuestros esfuerzos y compromiso, nos permiten trabajar a lo largo y ancho del territorio nacional, brindando servicios de documentación a cientos de argentinos alrededor del mundo.  Gestionamos diversos documentos como partidas de nacimiento, matrimonio, defunción, Apostillas de la Haya Argentina, certificados de estado civil, legalizaciones y traducciones. </h5>
                    <Link>Conocenos</Link>
                    <img src="" alt="" />
                </div>
            </div>
            <div className="Cont">
                <h2>Clientes satisfechos</h2>
                <Link>Conocenos</Link>
            </div>
            <div className="Cont">
                <h4>Servicios que ofrecemos</h4>
                <div>
                    <h4><img src="" alt="Doble-Check" />Apostillas</h4>
                    <h4><img src="" alt="Doble-Check" />Mediacion</h4>
                    <h4><img src="" alt="Doble-Check" />Legalizaciones</h4>
                    <h4><img src="" alt="Doble-Check" />Mediacion</h4>
                    <h4><img src="" alt="Doble-Check" />Copias o testimonios digitales</h4>
                    <h4><img src="" alt="Doble-Check" />Testamentos</h4>
                </div>
                <Link>Ver mas</Link>
            </div>
        </>
        );
    }

export {Inicio};
