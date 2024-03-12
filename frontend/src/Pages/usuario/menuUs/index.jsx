const MenuUs = () =>{
    return (
        <div className="ContInp">
                <div className="ContLbl">
                    <h3><b>Gestores especializado en: </b></h3>
                    <label htmlFor=""className="Lbl">
                        <h5>Control Interno</h5>
                        <input type="checkbox" name="" id="" />
                    </label>
                    <label htmlFor=""className="Lbl">
                        <h5>Contratación Pública</h5>
                        <input type="checkbox" name="" id="" />
                    </label>
                    <label htmlFor=""className="Lbl">
                        <h5>Contabilidad de Costos</h5>
                        <input type="checkbox" name="" id="" />
                    </label>
                    <label htmlFor=""className="Lbl">
                        <h5>Gobierno y Gestión de Datos</h5>
                        <input type="checkbox" name="" id="" />
                    </label>
                    <label htmlFor=""className="Lbl">
                        <h5>Análisis Estadístico</h5>
                        <input type="checkbox" name="" id="" />
                    </label>
                </div>
                <input type="search" name="" id="" placeholder="Buscar gestor..." className="Inpt" />
            </div>
    )
}

export { MenuUs }